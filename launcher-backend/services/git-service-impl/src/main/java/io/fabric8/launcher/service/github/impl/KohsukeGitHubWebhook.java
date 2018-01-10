package io.fabric8.launcher.service.github.impl;

import io.fabric8.launcher.service.git.api.GitHook;
import org.kohsuke.github.GHHook;

/**
 * {@link GitHook} implementation.
 */
public class KohsukeGitHubWebhook implements GitHook {

    /**
     * Constructor
     *
     * @param delegate the underlying {@link GHHook}
     */
    public KohsukeGitHubWebhook(final GHHook delegate) {
        assert delegate != null : "delegate is required";
        this.delegate = delegate;
        this.events = delegate
                .getEvents()
                .stream()
                .map(evt -> evt.name())
                .toArray(String[]::new);
    }

    private static final String CONFIG_URL = "url";

    private final GHHook delegate;

    private final String[] events;

    @Override
    public String getName() {
        return delegate.getName();
    }

    @Override
    public String getUrl() {
        return delegate.getConfig().get(CONFIG_URL);
    }

    @Override
    public String[] getEvents() {
        return events;
    }

}
