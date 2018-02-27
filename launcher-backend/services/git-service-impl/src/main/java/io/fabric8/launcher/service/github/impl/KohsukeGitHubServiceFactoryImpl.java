package io.fabric8.launcher.service.github.impl;

import java.io.IOException;
import java.util.Optional;
import java.util.logging.Logger;

import javax.enterprise.context.ApplicationScoped;

import io.fabric8.launcher.base.EnvironmentSupport;
import io.fabric8.launcher.base.identity.Identity;
import io.fabric8.launcher.base.identity.IdentityFactory;
import io.fabric8.launcher.base.identity.IdentityVisitor;
import io.fabric8.launcher.base.identity.TokenIdentity;
import io.fabric8.launcher.base.identity.UserPasswordIdentity;
import io.fabric8.launcher.service.github.api.GitHubService;
import io.fabric8.launcher.service.github.api.GitHubServiceFactory;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;

import static io.fabric8.launcher.service.github.api.GitHubEnvVarSysPropNames.LAUNCHER_MISSIONCONTROL_GITHUB_TOKEN;

/**
 * Implementation of the {@link GitHubServiceFactory}
 *
 * @author <a href="mailto:alr@redhat.com">Andrew Lee Rubinger</a>
 * @author <a href="mailto:xcoulon@redhat.com">Xavier Coulon</a>
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
@ApplicationScoped
public class KohsukeGitHubServiceFactoryImpl implements GitHubServiceFactory {


    private Logger log = Logger.getLogger(KohsukeGitHubServiceFactoryImpl.class.getName());

    @Override
    public GitHubService create(final Identity identity) {

        // Precondition checks
        if (identity == null) {
            throw new IllegalArgumentException("Identity is required");
        }

        final GitHub gitHub;
        try {
            final GitHubBuilder ghb = new GitHubBuilder();
            identity.accept(new IdentityVisitor() {
                @Override
                public void visit(TokenIdentity token) {
                    ghb.withOAuthToken(token.getToken());
                }

                @Override
                public void visit(UserPasswordIdentity userPassword) {
                    ghb.withPassword(userPassword.getUsername(), userPassword.getPassword());
                }
            });
            gitHub = ghb.build();
        } catch (final IOException ioe) {
            throw new RuntimeException("Could not create GitHub client", ioe);
        }
        final GitHubService ghs = new KohsukeGitHubServiceImpl(gitHub, identity);
        log.finest(() -> "Created backing GitHub client for identity using " + identity.getClass().getSimpleName());
        return ghs;
    }

    @Override
    public Optional<Identity> getDefaultIdentity() {
        // Try using the provided Github token
        String token = EnvironmentSupport.INSTANCE.getEnvVarOrSysProp(LAUNCHER_MISSIONCONTROL_GITHUB_TOKEN);
        return Optional.ofNullable(token).map(IdentityFactory::createFromToken);
    }
}