/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Eclipse Public License version 1.0, available at
 * http://www.eclipse.org/legal/epl-v10.html
 */

package io.fabric8.launcher.addon;

import io.openshift.booster.catalog.BoosterCatalog;
import io.openshift.booster.catalog.BoosterCatalogService;
import io.openshift.booster.catalog.LauncherConfiguration;
import org.jboss.forge.addon.ui.context.UIContext;
import org.jboss.forge.furnace.container.cdi.events.Local;
import org.jboss.forge.furnace.event.PostStartup;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.enterprise.concurrent.ManagedExecutorService;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.inject.Produces;
import javax.inject.Singleton;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Factory class for {@link BoosterCatalogService} objects
 *
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
@ApplicationScoped
public class BoosterCatalogFactory {

    private static final String LAUNCHER_CATALOG_LABEL_FILTERS = "LAUNCHER_CATALOG_LABEL_FILTERS";

    private static final String DEFAULT_GIT_REPOSITORY_URL = "https://github.com/fabric8-launcher/launcher-booster-catalog.git";

    private static final String DEFAULT_CATALOG_REF = "next";

    private BoosterCatalog defaultBoosterCatalog;

    private Map<CatalogServiceKey, BoosterCatalogService> cache = new ConcurrentHashMap<>();

    @Resource
    private ManagedExecutorService async;

    @PostConstruct
    public void reset() {
        cache.clear();
        defaultBoosterCatalog = getCatalog(
                getEnvVarOrSysProp(LauncherConfiguration.PropertyName.LAUNCHER_BOOSTER_CATALOG_REPOSITORY, DEFAULT_GIT_REPOSITORY_URL),
                getEnvVarOrSysProp(LauncherConfiguration.PropertyName.LAUNCHER_BOOSTER_CATALOG_REF, DEFAULT_CATALOG_REF));
        // Index the openshift-online-free catalog
        if (!Boolean.getBoolean("LAUNCHER_SKIP_OOF_CATALOG_INDEX")) {
            getCatalog(getEnvVarOrSysProp(LauncherConfiguration.PropertyName.LAUNCHER_BOOSTER_CATALOG_REPOSITORY, DEFAULT_GIT_REPOSITORY_URL),
                       "openshift-online-free");
        }
    }

    @SuppressWarnings("unchecked")
    public String[] getFilterLabels(UIContext context) {
        Map<Object, Object> attributeMap = context.getAttributeMap();
        List<String> labels = (List<String>) attributeMap.get(LAUNCHER_CATALOG_LABEL_FILTERS);
        if (labels != null && labels.size() > 0) {
            String filters = labels.get(0);
            if (filters.equals("all")) {
                // all is a special case which means that we don't want to apply
                // any filters.
                return new String[0];
            }
            return filters.split(",");
        } else {
            return new String[0];
        }
    }

    public BoosterCatalog getCatalog(UIContext context) {
        Map<Object, Object> attributeMap = context.getAttributeMap();
        String catalogUrl = (String) attributeMap.get(LauncherConfiguration.PropertyName.LAUNCHER_BOOSTER_CATALOG_REPOSITORY);
        String catalogRef = (String) attributeMap.get(LauncherConfiguration.PropertyName.LAUNCHER_BOOSTER_CATALOG_REF);
        if (catalogUrl == null && catalogRef == null) {
            return getDefaultCatalog();
        }
        return getCatalog(catalogUrl, catalogRef);
    }

    /**
     * @param catalogUrl the URL to use. Assumes {@link #DEFAULT_GIT_REPOSITORY_URL} if <code>null</code>
     * @param catalogRef the Git ref to use. Assumes {@link #DEFAULT_CATALOG_REF} if <code>null</code>
     * @return the {@link BoosterCatalogService} using the given catalog URL/ref tuple
     */
    public BoosterCatalog getCatalog(String catalogUrl, String catalogRef) {
        return cache.computeIfAbsent(
                new CatalogServiceKey(Objects.toString(catalogUrl, DEFAULT_GIT_REPOSITORY_URL),
                                      Objects.toString(catalogRef, DEFAULT_CATALOG_REF)),
                key -> {
                    BoosterCatalogService service = new BoosterCatalogService.Builder()
                            .catalogRepository(key.getCatalogUrl())
                            .catalogRef(key.getCatalogRef())
                            .executor(async)
                            .build();
                    service.index();
                    return service;
                });
    }

    @Produces
    @Singleton
    public BoosterCatalog getDefaultCatalog() {
        return defaultBoosterCatalog;
    }

    private static String getEnvVarOrSysProp(String name, String defaultValue) {
        return System.getProperty(name, System.getenv().getOrDefault(name, defaultValue));
    }

    void init(@Observes @Local PostStartup startup) {
        // This will automatically call the reset method when constructed
    }

    private class CatalogServiceKey {
        /**
         * @param catalogUrl
         * @param catalogRef
         */
        public CatalogServiceKey(String catalogUrl, String catalogRef) {
            super();
            this.catalogUrl = catalogUrl;
            this.catalogRef = catalogRef;
        }

        private final String catalogUrl;

        private final String catalogRef;

        /**
         * @return the catalogRef
         */
        public String getCatalogRef() {
            return catalogRef;
        }

        /**
         * @return the catalogUrl
         */
        public String getCatalogUrl() {
            return catalogUrl;
        }


        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            CatalogServiceKey that = (CatalogServiceKey) o;
            return Objects.equals(catalogUrl, that.catalogUrl) &&
                    Objects.equals(catalogRef, that.catalogRef);
        }

        @Override
        public int hashCode() {
            return Objects.hash(catalogUrl, catalogRef);
        }
    }
}
