/**
 * Copyright 2005-2015 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version
 * 2.0 (the "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 */
package io.fabric8.launcher.web.api;

import javax.json.JsonObject;
import javax.ws.rs.core.UriBuilder;

import io.fabric8.launcher.web.BaseResourceIT;
import io.fabric8.launcher.web.forge.util.JsonBuilder;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.junit.Test;
import org.junit.runner.RunWith;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.allOf;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.hamcrest.core.Is.is;

@RunWith(Arquillian.class)
@RunAsClient
public class LaunchResourceIT extends BaseResourceIT {

    public RequestSpecification configureEndpoint() {
        return new RequestSpecBuilder().setBaseUri(UriBuilder.fromUri(deploymentUri).path("api").path("launchpad").build()).build();
    }

    @Test
    public void shouldRespondWithVersion() {
        given()
                .spec(configureEndpoint())
        .when()
                .get("/version")
        .then()
                .assertThat().statusCode(200);
    }

    @Test
    public void shouldHaveAllStepsAvailable() {
        final JsonObject jsonObject = new JsonBuilder().createJson(1)
                .addInput("deploymentType", "Continuous delivery")
                .build();

        given()
                .spec(configureEndpoint())
                .contentType(JSON)
                .body(jsonObject.toString())
        .when()
                .post("/commands/launchpad-new-project/validate")
        .then()
                .assertThat()
                    .statusCode(200)
                    .body("inputs[0].label", is("Mission"))
                    .body("state.steps", allOf(iterableWithSize(4), hasItems("Deployment type", "Mission", "Runtime", "Project Info")))
                    .body("state.canMoveToNextStep", is(true))
                    .body("state.canMoveToPreviousStep", is(true));
    }

}