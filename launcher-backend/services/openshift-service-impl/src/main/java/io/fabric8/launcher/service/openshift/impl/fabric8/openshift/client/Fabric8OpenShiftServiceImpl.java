package io.fabric8.launcher.service.openshift.impl.fabric8.openshift.client;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import io.fabric8.kubernetes.api.Controller;
import io.fabric8.kubernetes.api.KubernetesHelper;
import io.fabric8.kubernetes.api.KubernetesNames;
import io.fabric8.kubernetes.api.model.ConfigMap;
import io.fabric8.kubernetes.api.model.ConfigMapBuilder;
import io.fabric8.kubernetes.api.model.DoneableConfigMap;
import io.fabric8.kubernetes.api.model.KubernetesList;
import io.fabric8.kubernetes.client.Config;
import io.fabric8.kubernetes.client.ConfigBuilder;
import io.fabric8.kubernetes.client.KubernetesClientException;
import io.fabric8.kubernetes.client.dsl.Resource;
import io.fabric8.launcher.base.identity.Identity;
import io.fabric8.launcher.base.identity.IdentityVisitor;
import io.fabric8.launcher.base.identity.TokenIdentity;
import io.fabric8.launcher.base.identity.UserPasswordIdentity;
import io.fabric8.launcher.service.openshift.api.DuplicateProjectException;
import io.fabric8.launcher.service.openshift.api.OpenShiftProject;
import io.fabric8.launcher.service.openshift.api.OpenShiftResource;
import io.fabric8.launcher.service.openshift.api.OpenShiftService;
import io.fabric8.launcher.service.openshift.impl.OpenShiftProjectImpl;
import io.fabric8.launcher.service.openshift.impl.OpenShiftResourceImpl;
import io.fabric8.launcher.service.openshift.spi.OpenShiftServiceSpi;
import io.fabric8.openshift.api.model.Build;
import io.fabric8.openshift.api.model.BuildConfig;
import io.fabric8.openshift.api.model.BuildRequest;
import io.fabric8.openshift.api.model.BuildRequestBuilder;
import io.fabric8.openshift.api.model.Parameter;
import io.fabric8.openshift.api.model.ProjectRequest;
import io.fabric8.openshift.api.model.RouteList;
import io.fabric8.openshift.api.model.Template;
import io.fabric8.openshift.client.DefaultOpenShiftClient;
import io.fabric8.openshift.client.OpenShiftClient;

/**
 * Implementation of the {@link OpenShiftService} using the Fabric8
 * OpenShift client
 *
 * @author <a href="mailto:alr@redhat.com">Andrew Lee Rubinger</a>
 * @author <a href="mailto:xcoulon@redhat.com">Xavier Coulon</a>
 */
public final class Fabric8OpenShiftServiceImpl implements OpenShiftService, OpenShiftServiceSpi {

    private static final Logger log = Logger.getLogger(Fabric8OpenShiftServiceImpl.class.getName());

    /**
     * Name of the JSON file containing the template to apply on the OpenShift
     * project after it has been created.
     */
    public static final String OPENSHIFT_PROJECT_TEMPLATE = "openshift-project-template.json";

    /**
     * Creates an {@link OpenShiftService} implementation communicating
     * with the backend service via the specified, required apiUrl authenticated
     * through the required oauthToken
     *
     * @param apiUrl
     * @param consoleUrl
     * @param identity
     */
    Fabric8OpenShiftServiceImpl(final String apiUrl, final String consoleUrl, final Identity identity) {
        assert apiUrl != null && !apiUrl.isEmpty() : "apiUrl is required";
        assert consoleUrl != null && !consoleUrl.isEmpty() : "consoleUrl is required";
        assert identity != null : "oauthToken is required";
        try {
            this.consoleUrl = new URL(consoleUrl);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        ConfigBuilder configBuilder = new ConfigBuilder()
                .withMasterUrl(apiUrl)
                //TODO Issue #17 never do this in production as it opens us to man-in-the-middle attacks
                .withTrustCerts(true);
        identity.accept(new IdentityVisitor() {
            @Override
            public void visit(TokenIdentity token) {
                configBuilder.withOauthToken(token.getToken());
            }

            @Override
            public void visit(UserPasswordIdentity userPassword) {
                configBuilder
                        .withUsername(userPassword.getUsername())
                        .withPassword(userPassword.getPassword());
            }
        });
        final Config config = configBuilder.build();
        this.client = new DefaultOpenShiftClient(config);
    }

    private static final Pattern PARAM_VAR_PATTERN = Pattern.compile("\\{\\{(.*?)/(.*?)\\[(.*)\\]\\}\\}");

    static {
        // Avoid using ~/.kube/config
        System.setProperty(Config.KUBERNETES_AUTH_TRYKUBECONFIG_SYSTEM_PROPERTY, "false");
        // Avoid using /var/run/secrets/kubernetes.io/serviceaccount/token
        System.setProperty(Config.KUBERNETES_AUTH_TRYSERVICEACCOUNT_SYSTEM_PROPERTY, "false");
    }

    private final OpenShiftClient client;

    private final URL consoleUrl;

    /**
     * {@inheritDoc}
     */
    @Override
    public OpenShiftProject createProject(final String name) throws
            DuplicateProjectException,
            IllegalArgumentException {

        // Create
        final ProjectRequest projectRequest;
        try {
            projectRequest = client.projectrequests().createNew().
                    withNewMetadata().
                    withName(name).
                    endMetadata().
                    done();
        } catch (final KubernetesClientException kce) {
            throw ExceptionMapper.throwMappedException(kce, name);
        }

        // Block until exists
        int counter = 0;
        while (true) {
            counter++;
            if (projectExists(name)) {
                // We good
                break;
            }
            if (counter == 20) {
                throw new IllegalStateException("Newly-created project "
                                                        + name + " could not be found ");
            }
            log.finest("Couldn't find project " + name +
                               " after creating; waiting and trying again...");
            try {
                Thread.sleep(3000);
            } catch (final InterruptedException ie) {
                Thread.interrupted();
                throw new RuntimeException("Someone interrupted thread while finding newly-created project", ie);
            }
        }
        // Populate value object and return it
        final String roundtripDisplayName = projectRequest.getMetadata().getName();

        return new OpenShiftProjectImpl(roundtripDisplayName, consoleUrl.toString());
    }

    @Override
    public Optional<OpenShiftProject> findProject(String name) throws IllegalArgumentException {
        assert name != null : "Project name cannot be null";
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Project name cannot be empty");
        }
        return Optional.ofNullable(projectExists(name) ? new OpenShiftProjectImpl(name, consoleUrl.toString()) : null);
    }

    @Override
    public List<OpenShiftProject> listProjects() {
        return client.projects().list().getItems()
                .stream()
                .map(project -> new OpenShiftProjectImpl(project.getMetadata().getName(), consoleUrl.toString()))
                .collect(Collectors.toList());
    }

    @Override
    public void configureProject(final OpenShiftProject project,
                                 final URI sourceRepositoryUri,
                                 final String gitRef,
                                 final URI pipelineTemplateUri) {
        final InputStream pipelineTemplateStream;
        try {
            pipelineTemplateStream = pipelineTemplateUri.toURL().openStream();
        } catch (IOException e) {
            throw new RuntimeException("Could not create OpenShift pipeline", e);
        }
        List<Parameter> parameters = Arrays.asList(
                createParameter("GIT_URL", sourceRepositoryUri.toString()),
                createParameter("GIT_REF", gitRef));
        configureProject(project, pipelineTemplateStream, parameters);
        fixJenkinsServiceAccount(project);
    }

    @Override
    public void configureProject(final OpenShiftProject project, final URI sourceRepositoryUri) {
        final InputStream pipelineTemplateStream = getClass().getResourceAsStream("/pipeline-template.yml");
        List<Parameter> parameters = Arrays.asList(
                createParameter("SOURCE_REPOSITORY_URL", sourceRepositoryUri.toString()),
                createParameter("PROJECT", project.getName()),
                createParameter("OPENSHIFT_CONSOLE_URL", this.getConsoleUrl().toString()),
                createParameter("GITHUB_WEBHOOK_SECRET", Long.toString(System.currentTimeMillis())));
        configureProject(project, pipelineTemplateStream, parameters);
        fixJenkinsServiceAccount(project);
    }

    @Override
    public void configureProject(final OpenShiftProject project, InputStream templateStream, final URI sourceRepositoryUri, final String sourceRepositoryContextDir) {
        List<Parameter> parameters = Arrays.asList(
                createParameter("SOURCE_REPOSITORY_URL", sourceRepositoryUri.toString()),
                createParameter("SOURCE_REPOSITORY_DIR", sourceRepositoryContextDir),
                createParameter("PROJECT", project.getName()),
                createParameter("OPENSHIFT_CONSOLE_URL", this.getConsoleUrl().toString()),
                createParameter("GITHUB_WEBHOOK_SECRET", Long.toString(System.currentTimeMillis())));
        configureProject(project, templateStream, parameters);
    }

    @Override
    public void configureProject(OpenShiftProject project, InputStream templateStream, Map<String, String> parameters) {
        assert project != null : "Project cannot be null";
        assert templateStream != null : "Template cannot be null";
        assert parameters != null : "Parameters cannot be null";
        List<Parameter> parameterList = parameters.entrySet().stream()
                .map(e -> createParameter(e.getKey(), e.getValue())).collect(Collectors.toList());
        configureProject(project, templateStream, parameterList);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<URL> getWebhookUrls(final OpenShiftProject project) throws IllegalArgumentException {
        if (project == null) {
            throw new IllegalArgumentException("project must be specified");
        }
        final URL openshiftConsoleUrl = this.getConsoleUrl();
        return project.getResources().stream()
                .filter(r -> r.getKind().equals("BuildConfig"))
                .map(item -> {
                    final OpenShiftResource buildConfig = item;
                    // Construct a URL in form:
                    // https://<OS_IP>:<OS_PORT>/oapi/v1/namespaces/<project>/buildconfigs/<BC-name/webhooks/<secret>/github
                    final String secret = buildConfig.getGitHubWebhookSecret();
                    final String webhookContext = "/oapi/v1/namespaces/" +
                            project.getName() + "/buildconfigs/" +
                            buildConfig.getName() + "/webhooks/" + secret + "/github";
                    try {
                        return new URL(openshiftConsoleUrl.getProtocol(), openshiftConsoleUrl.getHost(),
                                       openshiftConsoleUrl.getPort(), webhookContext);
                    } catch (MalformedURLException e) {
                        throw new RuntimeException("Failed to create Webhook URL for project '" + project.getName()
                                                           + "' using the OpenShift API URL '" + openshiftConsoleUrl.toExternalForm()
                                                           + "' and the webhook context '" + webhookContext + "'", e);
                    }
                })
                .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean deleteProject(final OpenShiftProject project) throws IllegalArgumentException {
        if (project == null) {
            throw new IllegalArgumentException("project must be specified");
        }
        final String projectName = project.getName();
        return this.deleteProject(projectName);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean deleteProject(final String projectName) throws IllegalArgumentException {
        if (projectName == null || projectName.isEmpty()) {
            throw new IllegalArgumentException("project name must be specified");
        }
        final boolean deleted = client.projects().withName(projectName).delete();
        if (deleted) {
            if (log.isLoggable(Level.FINEST)) {
                log.log(Level.FINEST, "Deleted project: " + projectName);
            }
        }
        return deleted;
    }

    @Override
    public boolean projectExists(String name) throws IllegalArgumentException {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Project name cannot be empty");
        }
        return client.projects().list().getItems().stream()
                .map(p -> p.getMetadata().getName())
                .anyMatch(Predicate.isEqual(name));
    }

    @Override
    public URL getServiceURL(String serviceName, OpenShiftProject project) throws IllegalArgumentException {
        String serviceURL = KubernetesHelper.getServiceURL(client, serviceName, project.getName(), "https", true);
        try {
            return new URL(serviceURL);
        } catch (MalformedURLException e) {
            // Should never happen
            throw new IllegalStateException("Malformed service URL: " + serviceURL, e);
        }
    }

    private Parameter createParameter(final String name, final String value) {
        Parameter parameter = new Parameter();
        parameter.setName(name);
        parameter.setValue(value);
        return parameter;
    }

    private void configureProject(final OpenShiftProject project, final InputStream templateStream,
                                  List<Parameter> parameters) {
        try {
            try (final InputStream pipelineTemplateStream = templateStream) {
                final Template template = client.templates().load(pipelineTemplateStream).get();
                assert template != null : "Template cannot be loaded, returned null";
                // Apply passed parameters to template
                for (Parameter parameter : parameters) {
                    if (parameter.getValue() != null) {
                        log.finest("Setting the '" + parameter.getName() + "' parameter value to '" + parameter.getValue() + "'.");
                        template.getParameters().stream()
                                .filter(p -> p.getName().equals(parameter.getName()))
                                .forEach(p -> p.setValue(parameter.getValue()));
                    }
                }

                // Handle parameters with special "fabric8-value" properties
                applyParameterValueProperties(project, template);

                log.finest(() -> "Deploying template '" + template.getMetadata() == null ? "(null metadata)" : template.getMetadata().getName() + "' with parameters:");
                template.getParameters().forEach(p -> log.finest("\t" + p.getDisplayName() + '=' + p.getValue()));
                final Controller controller = new Controller(client);
                controller.setNamespace(project.getName());
                final KubernetesList processedTemplate = (KubernetesList) controller.processTemplate(template, OPENSHIFT_PROJECT_TEMPLATE);

                // Retry operation if fails due to some async chimichanga
                for (int counter = 1; counter <= 10; counter++) {
                    try {
                        controller.apply(processedTemplate, OPENSHIFT_PROJECT_TEMPLATE);
                        if (counter > 1) {
                            log.log(Level.INFO, "Controller managed to apply changes after " + counter + " tries");
                        }
                        break;
                    } catch (final Exception e) {
                        log.log(Level.WARNING, "Error while applying changes to controller. Attempt #" + counter, e);
                        if (counter == 10) {
                            throw e;
                        }
                    }
                    try {
                        Thread.sleep(2000);
                    } catch (final InterruptedException ie) {
                        Thread.interrupted();
                        throw new RuntimeException("Someone interrupted thread while applying changes to controller", ie);
                    }
                }

                // add all template resources into the project
                processedTemplate.getItems().stream()
                        .map(item -> {
                            String gitHubWebHookSecret = null;
                            if (item instanceof BuildConfig) {
                                final BuildConfig bc = (BuildConfig) item;
                                gitHubWebHookSecret = bc.getSpec().
                                        getTriggers().
                                        stream().
                                        filter(
                                                r -> r.getGithub() != null).
                                        findFirst().
                                        get().
                                        getGithub().
                                        getSecret();
                            }
                            return (OpenShiftResource) new OpenShiftResourceImpl(
                                    item.getMetadata().getName(),
                                    item.getKind(),
                                    project,
                                    gitHubWebHookSecret);
                        })
                        .forEach(resource -> {
                            log.finest("Adding resource '" + resource.getName() + "' (" + resource.getKind()
                                               + ") to project '" + project.getName() + "'");
                            ((OpenShiftProjectImpl) project).addResource(resource);
                        });
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not create OpenShift pipeline", e);
        }
    }

    // This function looks for any parameters in the template that have the special
    // property "fabric8-value". If it encounters one it will take the property's
    // value string and look for any variables to replace.
    // The variables have the format <code>{{TYPE/NAME[PROPERTY_PATH]}}</code> where
    // <code>TYPE</code> is an OpenShift object type (like "route") and <code>NAME</code>
    // is the name of the object to look for and <code>PROPERTY_PATH</code> is the
    // property to get from that object (eg ".spec.host").
    // The variable will be replaced with the value obtained from the indicated
    // object property.
    private void applyParameterValueProperties(final OpenShiftProject project, final Template template) {
        RouteList routes = null;
        for (Parameter parameter : template.getParameters()) {
            // Find any parameters with special "fabric8-value" properties
            if (parameter.getAdditionalProperties().containsKey("fabric8-value")
                    && parameter.getValue() == null) {
                String value = parameter.getAdditionalProperties().get("fabric8-value").toString();
                Matcher m = PARAM_VAR_PATTERN.matcher(value);
                StringBuffer newval = new StringBuffer();
                while (m.find()) {
                    String type = m.group(1);
                    String routeName = m.group(2);
                    String propertyPath = m.group(3);
                    String propertyValue = "";
                    // We only support "route/XXX[.spec.host]" for now,
                    // but we're prepared for future expansion
                    if ("route".equals(type) && ".spec.host".equals(propertyPath)) {
                        // Try to find a Route with that name and use its host name
                        if (routes == null) {
                            routes = client.routes().inNamespace(project.getName()).list();
                        }
                        propertyValue = routes.getItems().stream()
                                .filter(r -> routeName.equals(r.getMetadata().getName()))
                                .map(r -> r.getSpec().getHost())
                                .filter(Objects::nonNull)
                                .findAny()
                                .orElse(propertyValue);
                    }
                    m.appendReplacement(newval, Matcher.quoteReplacement(propertyValue));
                }
                m.appendTail(newval);
                parameter.setValue(newval.toString());
            }
        }
    }

    private void fixJenkinsServiceAccount(final OpenShiftProject project) {
        // Add Admin role to the jenkins serviceaccount
        log.finest("Adding role admin to jenkins serviceaccount for project '" + project.getName() + "'");
        client.roleBindings()
                .inNamespace(project.getName())
                .withName("admin")
                .edit()
                .addToUserNames("system:serviceaccount:" + project.getName() + ":jenkins")
                .addNewSubject().withKind("ServiceAccount").withNamespace(project.getName()).withName("jenkins").endSubject()
                .done();

    }

    private URL getConsoleUrl() {
        return consoleUrl;
    }

    @Override
    public OpenShiftClient getOpenShiftClient() {
        return client;
    }

    @Override
    public void applyBuildConfig(BuildConfig buildConfig, String namespace, String sourceName) {
        Controller controller = new Controller(client);
        controller.setNamespace(namespace);
        controller.applyBuildConfig(buildConfig, sourceName);
    }

    @Override
    public void deleteBuildConfig(final String namespace, final String name) {
        client.buildConfigs().inNamespace(namespace).withName(name).delete();
    }

    @Override
    public Optional<ConfigMap> getConfigMap(String configName, String namespace) {
        return Optional.ofNullable(getResource(configName, namespace).get());
    }

    @Override
    public void createConfigMap(String configName, String namespace, ConfigMap configMap) {
        getResource(configName, namespace).create(configMap);
    }

    @Override
    public void updateConfigMap(String configName, String namespace, Map<String, String> data) {
        getResource(configName, namespace).edit().withData(data).done();
    }

    @Override
    public void deleteConfigMap(final String namespace, final String configName) {
        getResource(configName, namespace).delete();
    }

    @Override
    public void triggerBuild(String projectName, String namespace) {
        String triggeredBuildName;
        BuildRequest request = new BuildRequestBuilder().
                withNewMetadata().withName(projectName).endMetadata().
                addNewTriggeredBy().withMessage("Forge triggered").endTriggeredBy().
                build();
        try {
            Build build = client.buildConfigs().inNamespace(namespace)
                    .withName(projectName).instantiate(request);
            if (build != null) {
                triggeredBuildName = KubernetesHelper.getName(build);
                log.info("Triggered build " + triggeredBuildName);
            } else {
                log.severe("Failed to trigger build for " + namespace + "/" + projectName + " due to: no Build returned");
            }
        } catch (Exception e) {
            log.log(Level.SEVERE, "Failed to trigger build for " + namespace + "/" + projectName + " due to: " + e, e);
        }
    }

    @Override
    public ConfigMap createNewConfigMap(String ownerName) {
        String configMapName = KubernetesNames.convertToKubernetesName(ownerName, false);
        return new ConfigMapBuilder().withNewMetadata().withName(configMapName).
                addToLabels("provider", "fabric8").
                addToLabels("openshift.io/jenkins", "job").endMetadata().withData(new HashMap<>()).build();
    }

    private Resource<ConfigMap, DoneableConfigMap> getResource(String configName, String namespace) {
        String configMapName = KubernetesNames.convertToKubernetesName(configName, false);
        return client.configMaps().inNamespace(namespace).withName(configMapName);

    }

}
