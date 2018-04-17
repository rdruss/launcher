package io.fabric8.launcher.base.test.hoverfly;

import io.specto.hoverfly.junit.core.HoverflyConfig;
import io.specto.hoverfly.junit.rule.HoverflyRule;

import static io.specto.hoverfly.junit.core.SimulationSource.defaultPath;

public final class LauncherHoverflyRuleConfigurer {

    private LauncherHoverflyRuleConfigurer() {
        throw new IllegalAccessError("Utility class");
    }

    private static final String LAUNCHER_HOVERFLY_CAPTURE = "LAUNCHER_HOVERFLY_CAPTURE";

    /**
     * Use random available port
     */
    public static HoverflyRule createMultiTestHoverflyProxy(String destination) {
        return createHoverflyProxy("empty-descriptor.json", destination, 0);
    }

    /**
     * Use random available port
     */
    public static HoverflyRule createHoverflyProxy(String simulationFile, String destination) {
        return createHoverflyProxy(simulationFile, destination, 0);
    }

    /**
     * Creates service virtualization layer through mitm proxy for 3rd party API interaction.
     * If not specified otherwise by using LAUNCHER_HOVERFLY_CAPTURE env variable or system property
     * it will be running in the capture mode.
     *
     * Otherwise calls are proxied to the actual GitHub endpoint and captured afterwards. This way we can use
     * recorded calls against real service to update simulation in case of logic on either side has changes (ours: test
     * or component under test, or e.g. GitHub API).
     *
     * Few minor tweaks for GitHub are required in order to use captured traffic (see existing simulation file)
     * - replace exactMatch for paths to globMatch (except of one case for fork operation)
     * - relaxes request body matcher for push operation POST /git-receive-pack (making body "globMatch" : "*")
     * - mask authorization headers: e.g. "Authorization" : [ "token *" ]
     * - unify repo DELETE request to work for all repositories (to have only one request-response pair)
     */
    public static HoverflyRule createHoverflyProxy(String simulationFile, String destination, int port) {
        final HoverflyConfig hoverflyProxyConfig = HoverflyConfig.localConfigs()
                .disableTlsVerification()
                .proxyCaCert("cert.pem")
                .captureHeaders("Authorization")
                .destination(destination)
                .proxyPort(port);

        if (isHoverflyInSimulationMode()) {
            return HoverflyRule.inSimulationMode(defaultPath(simulationFile), hoverflyProxyConfig);
        } else {
            return HoverflyRule.inCaptureMode("captured/" + simulationFile, hoverflyProxyConfig);
        }
    }

    public static boolean isHoverflyInSimulationMode() {
        return !isHoverflyInCaptureMode();
    }

    public static boolean isHoverflyInCaptureMode() {
        return getBooleanEnvVarOrSysProp(LAUNCHER_HOVERFLY_CAPTURE, false);
    }

    private static boolean getBooleanEnvVarOrSysProp(final String envVarOrSysProp, final boolean defaultValue) throws IllegalArgumentException {
        //FIXME remove this code and move the environment reading part of the caller.

        if (envVarOrSysProp == null || envVarOrSysProp.isEmpty()) {
            throw new IllegalArgumentException("env var or sysprop name is required");
        }
        String value = System.getProperty(envVarOrSysProp);
        if (value == null || value.isEmpty()) {
            value = System.getenv(envVarOrSysProp);
        }
        // Set empty strings to null per contract
        if (value != null && value.isEmpty()) {
            value = null;
        }
        try {
            return Boolean.parseBoolean(value);
        } catch (IllegalArgumentException | NullPointerException e) {
            return defaultValue;
        }
    }



}
