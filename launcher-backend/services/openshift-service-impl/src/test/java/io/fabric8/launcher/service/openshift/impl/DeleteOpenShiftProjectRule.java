package io.fabric8.launcher.service.openshift.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Logger;

import io.fabric8.launcher.service.openshift.api.OpenShiftProject;
import io.fabric8.launcher.service.openshift.spi.OpenShiftServiceSpi;
import org.junit.rules.ExternalResource;

/**
 * JUnit rule to delete OpenShift projects at the end of a test.
 */
public class DeleteOpenShiftProjectRule extends ExternalResource {

    /**
     * Constructor
     *
     * @param test the test base which contains an OpenShift service to call to delete the projects.
     */
    public DeleteOpenShiftProjectRule(final OpenShiftServiceIT test) {
        this.test = test;
    }

    private static final Logger log = Logger.getLogger(DeleteOpenShiftProjectRule.class.getName());

    /**
     * the projects to delete.
     */
    private final Collection<OpenShiftProject> createdProjects = new ArrayList<>();

    /**
     * hook to the OpenShift service to call to delete the projects.
     */
    private final OpenShiftServiceIT test;

    /**
     * Adds a project in the list of projects to delete at the end of the test.
     *
     * @param project the project to delete
     */
    public void add(final OpenShiftProject project) {
        createdProjects.add(project);
    }

    @Override
    protected void before() {
        createdProjects.clear();
    }

    @Override
    protected void after() {
        createdProjects.forEach(project -> {
            final String projectName = project.getName();
            final boolean deleted = ((OpenShiftServiceSpi) test.getOpenShiftService()).deleteProject(project);
            log.info("Deleted " + projectName + ": " + deleted);
        });
    }

}
