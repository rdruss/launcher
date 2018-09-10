package io.fabric8.launcher.core.api.projectiles.context;

/**
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
public interface CoordinateCapable {
    String getGroupId();

    String getArtifactId();

    String getProjectVersion();

}
