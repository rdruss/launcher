package io.fabric8.launcher.web.producers;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Any;
import javax.enterprise.inject.Instance;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.NotFoundException;

import io.fabric8.launcher.base.identity.Identity;
import io.fabric8.launcher.base.identity.TokenIdentity;
import io.fabric8.launcher.core.spi.IdentityProvider;
import io.fabric8.launcher.service.git.api.GitService;
import io.fabric8.launcher.service.git.api.GitServiceFactory;
import io.fabric8.launcher.service.git.spi.GitProvider;
import io.fabric8.launcher.service.git.spi.GitProvider.GitProviderType;

import static io.fabric8.launcher.service.git.spi.GitProvider.GitProviderEnvironment.LAUNCHER_BACKEND_GIT_PROVIDER;
import static io.fabric8.launcher.service.git.spi.GitProvider.GitProviderType.GITHUB;
import static io.fabric8.launcher.service.git.spi.GitProvider.GitProviderType.valueOf;

/**
 * Produces {@link GitService} instances
 *
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
@ApplicationScoped
public class GitServiceProducer {

    private static final String GIT_PROVIDER_HEADER = "X-Git-Provider";

    private static final String DEFAULT_GIT_PROVIDER = LAUNCHER_BACKEND_GIT_PROVIDER.value(GITHUB.name()).toUpperCase();

    @Inject
    @Any
    private Instance<GitServiceFactory> gitServiceFactories;

    @Produces
    @RequestScoped
    GitService getGitService(final HttpServletRequest request, final IdentityProvider identityProvider, final TokenIdentity authorization) {
        final GitServiceFactory gitServiceFactory = getGitServiceFactory(request);
        final String provider = gitServiceFactory.getName().toLowerCase();
        final Identity identity = gitServiceFactory.getDefaultIdentity().orElseGet(() -> identityProvider.getIdentity(authorization, provider)
                .orElseThrow(() -> new NotFoundException("Git token not found")));
        return gitServiceFactory.create(identity);
    }

    /**
     * Check if X-Git-Provider header param is specified and use that, otherwise,
     * grab LAUNCHER_BACKEND_GIT_PROVIDER env param value. It fallbacks to GitHub if not specified
     *
     * @param request
     * @return
     */
    private GitServiceFactory getGitServiceFactory(HttpServletRequest request) {
        String provider = request.getHeader(GIT_PROVIDER_HEADER);
        if (provider == null) {
            provider = DEFAULT_GIT_PROVIDER;
        }
        GitProviderType type = valueOf(provider.toUpperCase());
        return gitServiceFactories.select(GitProvider.GitProviderLiteral.of(type)).get();
    }

}