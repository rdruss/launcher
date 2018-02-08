package io.fabric8.launcher.core.api.events;

/**
 * That holds all status messages that we send to the clients via
 * websockets to inform them about the status of their project
 */
public enum StatusEventType {

    GITHUB_CREATE("Creating your new GitHub repository"),
    GITHUB_PUSHED("Pushing your customized Booster code into the repo"),
    OPENSHIFT_CREATE("Creating your project on OpenShift Online"),
    OPENSHIFT_PIPELINE("Setting up your build pipeline"),
    GITHUB_WEBHOOK("Configuring to trigger builds on Git pushes");

    StatusEventType(String message) {
        this.message = message;
    }

    private final String message;

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return message;
    }
}
