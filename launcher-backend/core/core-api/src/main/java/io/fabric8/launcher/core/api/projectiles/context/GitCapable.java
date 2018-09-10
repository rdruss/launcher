package io.fabric8.launcher.core.api.projectiles.context;

/**
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
public interface GitCapable {
    String getGitOrganization();

    String getGitRepository();
}
