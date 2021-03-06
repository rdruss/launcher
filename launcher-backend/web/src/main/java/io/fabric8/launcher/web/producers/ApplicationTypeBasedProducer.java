package io.fabric8.launcher.web.producers;

import javax.enterprise.inject.Instance;
import javax.servlet.http.HttpServletRequest;

import io.fabric8.launcher.core.spi.Application;

import static io.fabric8.launcher.core.spi.Application.ApplicationLiteral.of;

/**
 * Looks up implementation of the CDI bean based on X-App header passed as part of request.
 * If not present defaults to "launcher"
 *
 * @param <T> type of the bean to look up
 * @see Application.ApplicationType
 */
abstract class ApplicationTypeBasedProducer<T> {


    T extractAppBasedImplementation(HttpServletRequest request, Instance<T> instances, Class<T> cls) {
        String headerValue = request.getHeader(Application.APP_HEADER);
        final Application.ApplicationType type = Application.ApplicationType.fromHeaderValue(headerValue);
        final Instance<T> instance = instances.select(cls, of(type));
        if (instance.isUnsatisfied()) {
            throw new IllegalArgumentException("Implementation of " + cls.getName() + " not found for app:" + type.name());
        }
        return instance.get();
    }
}
