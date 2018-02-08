package io.fabric8.launcher.osio.jenkins;

import org.yaml.snakeyaml.Yaml;

import javax.annotation.Nullable;
import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
@ApplicationScoped
public class JenkinsPipelineRegistry {
    private Map<String, JenkinsPipeline> pipelines = Collections.emptyMap();

    private static final String JENKINS_PIPELINE_REPO_URL = "https://github.com/fabric8io/fabric8-jenkinsfile-library.git";
    private static final String JENKINS_PIPELINE_REPO_REF = "master";

    private static final Logger log = Logger.getLogger(JenkinsPipelineRegistry.class.getName());

    /**
     * Builds the registry index. Should be called only once
     */
    @PostConstruct
    public void index() {
        try {
            Path pipelinesPath = clonePipelinesLibrary(JENKINS_PIPELINE_REPO_URL, JENKINS_PIPELINE_REPO_REF);

            Map<String, JenkinsPipeline> pipes =  new HashMap<>();
            Files.walkFileTree(pipelinesPath, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    String name = file.getFileName().toString();
                    if (name.equals("metadata.yml") || name.equals("metadata.yaml")) {
                        JenkinsPipeline p = readPipeline(file);
                        if (p != null) {
                            pipes.put(p.getId(), p);
                        }
                    }
                    return super.visitFile(file, attrs);
                }
            });
            pipelines = Collections.unmodifiableMap(pipes);
        } catch (IOException e) {
            log.log(Level.SEVERE, "Unable to index Jenkins pipelines", e);
        }
    }

    private Path clonePipelinesLibrary(String repoUrl, String repoRef) throws IOException {
        log.log(Level.INFO, "Indexing contents from {0} using {1} ref",
                new Object[]{repoUrl, repoRef});
        Path targetPath = Files.createTempDirectory("pipeline-library");
        log.info("Created " + targetPath);
        ProcessBuilder builder = new ProcessBuilder()
                .command("git", "clone", repoUrl, "--branch", repoRef,
                        "--recursive", "--depth=1", "--quiet",
                        targetPath.toString())
                .inheritIO();
        log.info("Executing: " + builder.command().stream().collect(Collectors.joining(" ")));
        try {
            int exitCode = builder.start().waitFor();
            assert exitCode == 0 : "Process returned exit code: " + exitCode;
        } catch (InterruptedException e) {
            log.log(Level.WARNING, "Interrupted indexing process");
            throw new IOException("Interrupted", e);
        }
        return targetPath;
    }

    @Nullable
    @SuppressWarnings("unchecked")
    private JenkinsPipeline readPipeline(Path metadataFile) {
        Yaml yaml = new Yaml();
        try (BufferedReader reader = Files.newBufferedReader(metadataFile)) {
            Map<String, Object> metadata = yaml.loadAs(reader, Map.class);
            String platform = metadataFile.getParent().getParent().getFileName().toString();
            String name = metadataFile.getParent().getFileName().toString();
            String id = platform + "-" + name;
            String description = Objects.toString(metadata.getOrDefault("description", ""));
            boolean suggested = Boolean.valueOf(Objects.toString(metadata.getOrDefault("suggested", "false")));
            List<String> stages = metadata.get("stages") instanceof List ? (List<String>) metadata.get("stages") : Collections.emptyList();
            ImmutableJenkinsPipeline.Builder builder = ImmutableJenkinsPipeline.builder()
                    .id(id)
                    .platform(platform)
                    .name(name)
                    .description(description)
                    .isSuggested(suggested)
                    .stages(stages)
                    .jenkinsfilePath(metadataFile);
            return builder.build();
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error while reading " + metadataFile, e);
            return null;
        }
    }

    public Collection<JenkinsPipeline> getPipelines() {
        return pipelines.values();
    }

    public Optional<JenkinsPipeline> findPipelineById(String pipelineId) {
        return getPipelines().stream().filter(p -> p.getId().equalsIgnoreCase(pipelineId)).findFirst();
    }
}
