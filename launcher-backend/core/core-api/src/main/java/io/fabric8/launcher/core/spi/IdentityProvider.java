package io.fabric8.launcher.core.spi;

import java.util.Optional;

import io.fabric8.launcher.base.identity.Identity;

/**
 * An {@link IdentityProvider} returns identities for any given service
 *
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
public interface IdentityProvider {

    Optional<Identity> getIdentity(String service);

    interface ServiceType {
        String GITHUB = "github";
        String OPENSHIFT = "openshift-v3";
    }

}
