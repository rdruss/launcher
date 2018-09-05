package io.fabric8.launcher.osio.web.endpoints;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.ws.rs.BeanParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import io.fabric8.launcher.core.api.ImmutableAsyncBoom;
import io.fabric8.launcher.core.api.events.StatusMessageEvent;
import io.fabric8.launcher.core.api.security.Secured;
import io.fabric8.launcher.core.spi.DirectoryReaper;
import io.fabric8.launcher.osio.OsioLaunchMissionControl;
import io.fabric8.launcher.osio.projectiles.OsioLaunchProjectile;
import io.fabric8.launcher.osio.projectiles.context.OsioProjectileContext;
import org.apache.commons.lang3.time.StopWatch;

import static io.fabric8.launcher.core.api.events.LauncherStatusEventKind.GITHUB_CREATE;
import static io.fabric8.launcher.core.api.events.LauncherStatusEventKind.GITHUB_PUSHED;
import static io.fabric8.launcher.core.api.events.LauncherStatusEventKind.GITHUB_WEBHOOK;
import static io.fabric8.launcher.core.api.events.LauncherStatusEventKind.OPENSHIFT_CREATE;
import static io.fabric8.launcher.core.api.events.LauncherStatusEventKind.OPENSHIFT_PIPELINE;
import static io.fabric8.launcher.osio.OsioStatusEventKind.CODEBASE_CREATED;
import static java.util.Arrays.asList;

/**
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
@Path("/osio/launch")
@RequestScoped
public class OsioLaunchEndpoint {

    @Inject
    private OsioLaunchMissionControl missionControl;

    @Inject
    private DirectoryReaper reaper;

    private static Logger log = Logger.getLogger(OsioLaunchEndpoint.class.getName());

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public void launch(@Valid @BeanParam OsioProjectileContext context, @Suspended AsyncResponse asyncResponse,
                       @Context HttpServletResponse response) throws IOException {
        OsioLaunchProjectile projectile = missionControl.prepare(context);

        // No need to hold off the processing, return the status link immediately
        try (ServletOutputStream stream = response.getOutputStream()) {
            asyncResponse.resume(ImmutableAsyncBoom.builder()
                                         .uuid(projectile.getId())
                                         .eventTypes(asList(GITHUB_CREATE, OPENSHIFT_CREATE, GITHUB_PUSHED, GITHUB_WEBHOOK, OPENSHIFT_PIPELINE, CODEBASE_CREATED))
                                         .build());
        }

        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        try {
            log.log(Level.INFO, "Launching OSIO Import projectile {0}", projectile);
            missionControl.launch(projectile);
            stopWatch.stop();
            log.log(Level.INFO, "OSIO Import Projectile {0} launched. Time Elapsed: {1}", new Object[]{projectile.getId(), stopWatch});
        } catch (Exception ex) {
            stopWatch.stop();
            log.log(Level.WARNING, "OSIO Projectile " + projectile + " failed to launch. Time Elapsed: " + stopWatch, ex);
            projectile.getEventConsumer().accept(new StatusMessageEvent(projectile.getId(), ex));
        } finally {
            reaper.delete(projectile.getProjectLocation());
        }
    }
}
