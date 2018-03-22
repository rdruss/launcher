package io.fabric8.launcher.osio.projectiles;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.ws.rs.FormParam;

public class OsioImportProjectileContext {

    @FormParam("gitOrganization")
    private String gitOrganization;

    @FormParam("gitRepository")
    @NotNull(message = "Git repository is required")
    private String gitRepository;

    @FormParam("projectName")
    @NotNull(message = "Project Name is required")
    @Pattern(message = "The project name should follow the same pattern as a DNS-1123 subdomain " +
            "and must consist of lower case alphanumeric characters, '-' or '.', and must start " +
            "and end with an alphanumeric character",
            regexp = "[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*")
    private String projectName;

    @FormParam("pipelineId")
    @NotNull
    private String pipelineId;

    @FormParam("spaceId")
    @NotNull
    private String spaceId;

    public String getGitOrganization() {
        return gitOrganization;
    }

    public String getGitRepository() {
        return gitRepository;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getPipelineId() {
        return pipelineId;
    }

    public String getSpaceId() {
        return spaceId;
    }
}
