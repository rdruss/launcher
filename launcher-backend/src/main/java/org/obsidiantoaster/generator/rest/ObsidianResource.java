/**
 *  Copyright 2005-2015 Red Hat, Inc.
 *
 *  Red Hat licenses this file to you under the Apache License, version
 *  2.0 (the "License"); you may not use this file except in compliance
 *  with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 *  implied.  See the License for the specific language governing
 *  permissions and limitations under the License.
 */
package org.obsidiantoaster.generator.rest;

import static javax.json.Json.createObjectBuilder;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.enterprise.concurrent.ManagedExecutorService;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonString;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import org.jboss.forge.addon.resource.Resource;
import org.jboss.forge.addon.resource.ResourceFactory;
import org.jboss.forge.addon.ui.command.CommandFactory;
import org.jboss.forge.addon.ui.command.UICommand;
import org.jboss.forge.addon.ui.context.UIContext;
import org.jboss.forge.addon.ui.context.UISelection;
import org.jboss.forge.addon.ui.controller.CommandController;
import org.jboss.forge.addon.ui.controller.CommandControllerFactory;
import org.jboss.forge.addon.ui.controller.WizardCommandController;
import org.jboss.forge.addon.ui.result.Failed;
import org.jboss.forge.addon.ui.result.Result;
import org.jboss.forge.furnace.versions.Versions;
import org.jboss.forge.service.ui.RestUIContext;
import org.jboss.forge.service.ui.RestUIRuntime;
import org.jboss.forge.service.util.UICommandHelper;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataOutput;
import org.obsidiantoaster.generator.ForgeInitializer;
import org.obsidiantoaster.generator.event.FurnaceStartup;
import org.obsidiantoaster.generator.util.JsonBuilder;

@javax.ws.rs.Path("/forge")
@ApplicationScoped
public class ObsidianResource
{
   private static final String DEFAULT_COMMAND_NAME = "obsidian-new-quickstart";

   private static final Logger log = Logger.getLogger(ObsidianResource.class.getName());
   private static final String CATAPULT_SERVICE_HOST = "CATAPULT_SERVICE_HOST";

   private final Map<String, String> commandMap = new TreeMap<>();

   private final BlockingQueue<Path> directoriesToDelete = new LinkedBlockingQueue<>();

   @javax.annotation.Resource
   private ManagedExecutorService executorService;

   public ObsidianResource()
   {
      commandMap.put("obsidian-new-quickstart", "Obsidian: New Quickstart");
      commandMap.put("obsidian-new-project", "Obsidian: New Project");
   }

   @Inject
   private CommandFactory commandFactory;

   @Inject
   private CommandControllerFactory controllerFactory;

   @Inject
   private ResourceFactory resourceFactory;

   @Inject
   private UICommandHelper helper;

   void init(@Observes FurnaceStartup startup)
   {
      try
      {
         log.info("Warming up internal cache");
         // Warm up
         getCommand(DEFAULT_COMMAND_NAME, ForgeInitializer.getRoot(), null);
         log.info("Caches warmed up");
         executorService.submit(() -> {
            java.nio.file.Path path = null;
            try
            {
               while ((path = directoriesToDelete.take()) != null)
               {
                  log.info("Deleting " + path);
                  org.obsidiantoaster.generator.util.Paths.deleteDirectory(path);
               }
            }
            catch (IOException io)
            {
               log.log(Level.SEVERE, "Error while deleting" + path, io);
            }
            catch (InterruptedException e)
            {
               // Do nothing
            }
         });
      }
      catch (Exception e)
      {
         log.log(Level.SEVERE, "Error while warming up cache", e);
      }
   }

   @GET
   @javax.ws.rs.Path("/version")
   @Produces(MediaType.APPLICATION_JSON)
   public JsonObject getInfo()
   {
      return createObjectBuilder()
               .add("backendVersion", String.valueOf(ForgeInitializer.getVersion()))
               .add("forgeVersion", Versions.getImplementationVersionFor(UIContext.class).toString())
               .build();
   }

   @GET
   @javax.ws.rs.Path("/commands/{commandName}")
   @Produces(MediaType.APPLICATION_JSON)
   public JsonObject getCommandInfo(
            @PathParam("commandName") @DefaultValue(DEFAULT_COMMAND_NAME) String commandName,
            @Context HttpHeaders headers)
            throws Exception
   {
      validateCommand(commandName);
      JsonObjectBuilder builder = createObjectBuilder();
      try (CommandController controller = getCommand(commandName, ForgeInitializer.getRoot(), headers))
      {
         helper.describeController(builder, controller);
      }
      return builder.build();
   }

   @POST
   @javax.ws.rs.Path("/commands/{commandName}/validate")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public JsonObject validateCommand(JsonObject content,
            @PathParam("commandName") @DefaultValue(DEFAULT_COMMAND_NAME) String commandName,
            @Context HttpHeaders headers)
            throws Exception
   {
      validateCommand(commandName);
      JsonObjectBuilder builder = createObjectBuilder();
      try (CommandController controller = getCommand(commandName, ForgeInitializer.getRoot(), headers))
      {
         helper.populateControllerAllInputs(content, controller);
         helper.describeCurrentState(builder, controller);
         helper.describeValidation(builder, controller);
         helper.describeInputs(builder, controller);
      }
      return builder.build();
   }

   @POST
   @javax.ws.rs.Path("/commands/{commandName}/next")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public JsonObject nextStep(JsonObject content,
            @PathParam("commandName") @DefaultValue(DEFAULT_COMMAND_NAME) String commandName,
            @Context HttpHeaders headers)
            throws Exception
   {
      validateCommand(commandName);
      int stepIndex = content.getInt("stepIndex", 1);
      JsonObjectBuilder builder = createObjectBuilder();
      try (CommandController controller = getCommand(commandName, ForgeInitializer.getRoot(), headers))
      {
         if (!(controller instanceof WizardCommandController))
         {
            throw new WebApplicationException("Controller is not a wizard", Status.BAD_REQUEST);
         }
         WizardCommandController wizardController = (WizardCommandController) controller;
         for (int i = 0; i < stepIndex; i++)
         {
            if (wizardController.canMoveToNextStep())
            {
               helper.populateController(content, wizardController);
               helper.describeValidation(builder, controller);
               wizardController.next().initialize();
            }
         }
         helper.describeMetadata(builder, controller);
         helper.describeCurrentState(builder, controller);
         helper.describeInputs(builder, controller);
      }
      return builder.build();
   }

   @POST
   @javax.ws.rs.Path("/commands/{commandName}/zip")
   @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
   public Response downloadZip(Form form,
            @PathParam("commandName") @DefaultValue(DEFAULT_COMMAND_NAME) String commandName,
            @Context HttpHeaders headers)
            throws Exception
   {
      validateCommand(commandName);
      String stepIndex = form.asMap().remove("stepIndex").get(0);
      final JsonBuilder jsonBuilder = new JsonBuilder().createJson(Integer.parseInt(stepIndex));
      for (Map.Entry<String, List<String>> entry : form.asMap().entrySet())
      {
         jsonBuilder.addInput(entry.getKey(), entry.getValue());
      }

      final Response response = downloadZip(jsonBuilder.build(), commandName, headers);
      if (response.getEntity() instanceof JsonObject)
      {
         JsonObject responseEntity = (JsonObject) response.getEntity();
         String error = ((JsonObject) responseEntity.getJsonArray("messages").get(0)).getString("description");
         return Response.status(Status.PRECONDITION_FAILED).entity(error).build();
      }
      return response;
   }

   @POST
   @javax.ws.rs.Path("/commands/{commandName}/zip")
   @Consumes(MediaType.APPLICATION_JSON)
   public Response downloadZip(JsonObject content,
            @PathParam("commandName") @DefaultValue(DEFAULT_COMMAND_NAME) String commandName,
            @Context HttpHeaders headers)
            throws Exception
   {
      validateCommand(commandName);
      java.nio.file.Path path = Files.createTempDirectory("projectDir");
      try (CommandController controller = getCommand(commandName, path, headers))
      {
         helper.populateControllerAllInputs(content, controller);
         if (controller.isValid())
         {
            Result result = controller.execute();
            if (result instanceof Failed)
            {
               return Response.status(Status.INTERNAL_SERVER_ERROR).entity(result.getMessage()).build();
            }
            else
            {
               UISelection<?> selection = controller.getContext().getSelection();
               java.nio.file.Path projectPath = Paths.get(selection.get().toString());
               String artifactId = findArtifactId(content);
               byte[] zipContents = org.obsidiantoaster.generator.util.Paths.zip(artifactId, projectPath);
               return Response
                        .ok(zipContents)
                        .type("application/zip")
                        .header("Content-Disposition", "attachment; filename=\"" + artifactId + ".zip\"")
                        .build();
            }
         }
         else
         {
            JsonObjectBuilder builder = createObjectBuilder();
            helper.describeValidation(builder, controller);
            return Response.status(Status.PRECONDITION_FAILED).entity(builder.build()).build();
         }
      }
      finally
      {
         directoriesToDelete.offer(path);
      }
   }

   @POST
   @javax.ws.rs.Path("/commands/{commandName}/catapult")
   @Consumes(MediaType.APPLICATION_JSON)
   public Response uploadZip(JsonObject content,
            @PathParam("commandName") @DefaultValue(DEFAULT_COMMAND_NAME) String commandName,
            @Context HttpHeaders headers)
            throws Exception
   {
      Response response = downloadZip(content, commandName, headers);
      if (response.getStatus() != 200)
      {
         return response;
      }
      byte[] zipContents = (byte[]) response.getEntity();
      Client client = ClientBuilder.newBuilder().build();
      WebTarget target = client.target(createCatapultUri());
      client.property("Content-Type", MediaType.MULTIPART_FORM_DATA);
      Invocation.Builder builder = target.request().header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA);
      // Propagate Authorization header
      if (headers.getHeaderString(HttpHeaders.AUTHORIZATION) != null)
      {
         builder.header(HttpHeaders.AUTHORIZATION, headers.getHeaderString(HttpHeaders.AUTHORIZATION));
      }
      MultipartFormDataOutput multipartFormDataOutput = new MultipartFormDataOutput();
      multipartFormDataOutput.addFormData("file", new ByteArrayInputStream(zipContents),
               MediaType.MULTIPART_FORM_DATA_TYPE, "project.zip");

      Response postResponse = builder.post(Entity.entity(multipartFormDataOutput, MediaType.MULTIPART_FORM_DATA_TYPE));
      return Response.ok(postResponse.getLocation().toString()).build();
   }

   private URI createCatapultUri()
   {
      UriBuilder uri = UriBuilder.fromPath("/api/catapult/upload");
      String serviceHost = System.getenv(CATAPULT_SERVICE_HOST);
      if (serviceHost == null)
      {
         throw new WebApplicationException("'" + CATAPULT_SERVICE_HOST + "' environment variable must be set!");
      }
      uri.host(serviceHost);
      String port = System.getenv("CATAPULT_SERVICE_PORT");
      uri.port(port != null ? Integer.parseInt(port) : 80);
      uri.scheme("http");
      return uri.build();
   }

   protected void validateCommand(String commandName)
   {
      if (commandMap.get(commandName) == null)
      {
         String message = "No such command `" + commandName + "`. Supported commmands are '"
                  + String.join("', '", commandMap.keySet()) + "'";
         throw new WebApplicationException(message, Status.NOT_FOUND);
      }
   }

   private String findArtifactId(JsonObject content)
   {
      String artifactId = content.getJsonArray("inputs").stream()
               .filter(input -> "named".equals(((JsonObject) input).getString("name")))
               .map(input -> ((JsonString) ((JsonObject) input).get("value")).getString())
               .findFirst().orElse("demo");
      return artifactId;
   }

   private CommandController getCommand(String name, Path initialPath, HttpHeaders headers) throws Exception
   {
      RestUIContext context = createUIContext(initialPath, headers);
      UICommand command = commandFactory.getNewCommandByName(context, commandMap.get(name));
      CommandController controller = controllerFactory.createController(context,
               new RestUIRuntime(Collections.emptyList()), command);
      controller.initialize();
      return controller;
   }

   private RestUIContext createUIContext(Path initialPath, HttpHeaders headers)
   {
      Resource<?> selection = resourceFactory.create(initialPath.toFile());
      RestUIContext context = new RestUIContext(selection, Collections.emptyList());
      if (headers != null)
      {
         Map<Object, Object> attributeMap = context.getAttributeMap();
         MultivaluedMap<String, String> requestHeaders = headers.getRequestHeaders();
         requestHeaders.keySet().forEach(key -> attributeMap.put(key, headers.getRequestHeader(key)));
      }
      return context;
   }
}
