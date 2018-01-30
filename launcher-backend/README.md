# Launcher Backend

[![Build Status](https://ci.centos.org/view/Devtools/job/devtools-launcher-backend-generator-build-master/badge/icon)](https://ci.centos.org/view/Devtools/job/devtools-launcher-backend-generator-build-master/)

This code generator project which is a Java backend system exposes several JBoss Forge commands
using a REST endpoint. The backend runs within a WildFly Swarm container and is called from
an Angular Front application responsible to collect from an end user the information needed to generate
a Zip file containing a Maven project populated for an Eclipse Vert.x, Spring Boot, WildFly Swarm or Node.js
container.

* Build this project:
```bash
$ mvn clean install
```

* Set the following environment variables: 
		$ export LAUNCHER_MISSIONCONTROL_SERVICE_HOST=localhost
		$ export LAUNCHER_MISSIONCONTROL_SERVICE_PORT=8080

* Execute the uber-jar in the target folder with:
```bash
$ java -jar web/target/launcher-backend-swarm.jar
```

Then follow the [front-end README](https://github.com/fabric8-launcher/launcher-frontend/blob/master/README.md) to run the front-end.

Build and Run the Unit Tests
----------------------------

* Execute:

        $ mvn clean install

Prerequisites to Run Integration Tests
--------------------------------------

1. A GitHub Account

    * Log into GitHub and generate an access token for use here:
    --  https://github.com/settings/tokens
        * Set scopes
            * `repo`
            * `admin:repo_hook`
            * `delete_repo`
    * Create 2 environment variables:
        * `LAUNCHER_MISSIONCONTROL_GITHUB_USERNAME`
        * `LAUNCHER_MISSIONCONTROL_GITHUB_TOKEN`

    For instance you may create a `~/launcher-missioncontrol-env.sh` file and add:
    
        #!/bin/sh
        export LAUNCHER_MISSIONCONTROL_GITHUB_USERNAME=<your github username>
        export LAUNCHER_MISSIONCONTROL_GITHUB_TOKEN=<token created from above>
    
    You can also reuse what's already defined in your `.gitconfig` file:
    
        #!/bin/sh
        export LAUNCHER_MISSIONCONTROL_GITHUB_USERNAME=`git config github.user`
        export LAUNCHER_MISSIONCONTROL_GITHUB_TOKEN=`git config github.token`

    Use `source ~/launcher-missioncontrol-env.sh` to make your changes visible; you may check by typing into a terminal:

        $ echo $LAUNCHER_MISSIONCONTROL_GITHUB_USERNAME
        $ echo $LAUNCHER_MISSIONCONTROL_GITHUB_TOKEN
    
2. A locally-running instance of OpenShift 

    * Install minishift and prerequisite projects by following these instructions
        * https://github.com/minishift/minishift#installing-minishift
	
    * Check everything works okay by loggin in to the OpenShift console
        * Run `minishift start --memory=4096`
        * Open the URL found in the output of the previous command in a browser. You can get the same URL by executing `minishift console --url` as well.
        * Log in with user `developer` and password `developer`
        * You may have to accept some security exceptions in your browser because of missing SSL Certificates

    * Set up the following environment variables (possibly in your `launcher-missioncontrol-env.sh` file):
        ```
        LAUNCHER_MISSIONCONTROL_OPENSHIFT_API_URL=<insert minishift console url something like https://192.168.99.128:8443>
        LAUNCHER_MISSIONCONTROL_OPENSHIFT_CONSOLE_URL=<insert minishift console url something like https://192.168.99.128:8443>
        ```
        
        You can do this automatically in the following way:       
        ```
        export LAUNCHER_MISSIONCONTROL_OPENSHIFT_API_URL=`minishift console --url`
        export LAUNCHER_MISSIONCONTROL_OPENSHIFT_CONSOLE_URL=`minishift console --url`
        ```

3. A Keycloak server

    * Make sure your Federated Identity settings are correct
        * Open Chrome and go to: https://prod-preview.openshift.io/
        * Click Sign-in (in the upper right corner), you should be redirected to developers.redhat.com
        * Navigate to https://sso.prod-preview.openshift.io/auth/realms/fabric8/account/identity
        * Make sure that the Github and Openshift v3 tokens are set

    * Set up the following environment variables (possibly in your `launcher-missioncontrol-env.sh` file): 
      ```
        export LAUNCHER_KEYCLOAK_URL=https://sso.prod-preview.openshift.io/auth
        export LAUNCHER_KEYCLOAK_REALM=fabric8
      ```
    IMPORTANT: Mission Control will not use the keycloak server if you provide the following environment variables:
      ```    
        export LAUNCHER_MISSIONCONTROL_OPENSHIFT_USERNAME=<user>
        export LAUNCHER_MISSIONCONTROL_OPENSHIFT_PASSWORD=<pass>
      ```

4. Testing setup

   * Make sure you refer to a trust store used for Service Virtualization tests:
     ```
     export LAUNCHER_TESTS_TRUSTSTORE_PATH=${PWD}/services/git-service-impl/src/test/resources/hoverfly/hoverfly.jks
     ```    

5. (Optional) Ensure from the previous steps all environment variables are properly set up and sourced into your terminal:

For instance, in a Unix-like environment you may like to create a `launcher-missioncontrol-env.sh` file to hold the following; this may be executed using `source launchpad-missioncontrol-env.sh`: 

```
#!/bin/sh 

export LAUNCHER_MISSIONCONTROL_GITHUB_USERNAME=<replace with your github username>
export LAUNCHER_MISSIONCONTROL_GITHUB_TOKEN=<replace with your personal token (see step 1)>
export LAUNCHER_MISSIONCONTROL_OPENSHIFT_API_URL=`minishift console --url`
export LAUNCHER_MISSIONCONTROL_OPENSHIFT_CONSOLE_URL=`minishift console --url`
export LAUNCHER_KEYCLOAK_URL=https://sso.openshift.io/auth
export LAUNCHER_KEYCLOAK_REALM=rh-developers-launch
export LAUNCHER_MISSIONCONTROL_OPENSHIFT_USERNAME=developer
export LAUNCHER_MISSIONCONTROL_OPENSHIFT_PASSWORD=developer

# Create your user and token in gitlab.com
export LAUNCHER_MISSIONCONTROL_GITLAB_USERNAME=<replace with your gitlab username>
export LAUNCHER_MISSIONCONTROL_GITLAB_PRIVATE_TOKEN=<replace with your personal token>

unset LAUNCHER_MISSIONCONTROL_OPENSHIFT_TOKEN
# LAUNCHER_MISSIONCONTROL_OPENSHIFT_TOKEN, if set, will override username/password authentication scheme
#export LAUNCHER_MISSIONCONTROL_OPENSHIFT_TOKEN=<token here>

# If Keycloak is enabled, set the LAUNCHER_MISSIONCONTROL_OPENSHIFT_CLUSTERS_FILE parameter
# export LAUNCHER_MISSIONCONTROL_OPENSHIFT_CLUSTERS_FILE=/etc/openshift-clusters.yaml 
# unset LAUNCHER_MISSIONCONTROL_OPENSHIFT_API_URL
# unset LAUNCHER_MISSIONCONTROL_OPENSHIFT_CONSOLE_URL

# Test setup
export LAUNCHER_TESTS_TRUSTSTORE_PATH=${PWD}/services/git-service-impl/src/test/resources/hoverfly/hoverfly.jks

``` 
Run the OSIO addon
------------------
See how to run the [fabric8-ui project](https://github.com/fabric8-ui/fabric8-ui) and set the environment variables to either prod, pre-prod or dev.
Then override the `FABRIC8_FORGE_API_URL` with the instance that you are running like this:
```
export FABRIC8_FORGE_API_URL=http://localhost:8080/api/launchpad
```
Before starting this project set `WIT_URL`, `AUTH_URL`, `KEYCLOAK_SAAS_URL` and `OPENSHIFT_API_URL` for prod this would be:
```
export WIT_URL=https://api.openshift.io                         
export AUTH_URL=https://auth.openshift.io
export KEYCLOAK_SAAS_URL=https://sso.openshift.io/
export OPENSHIFT_API_URL=https://api.starter-us-east-2.openshift.com
```
        
Run the Integration Tests, Optionally Building
----------------------------------------------

* You need to set the following environment variables before running the integration tests: 

		$ export LAUNCHER_MISSIONCONTROL_SERVICE_HOST=localhost
		$ export LAUNCHER_MISSIONCONTROL_SERVICE_PORT=8080


* To build the project and run the integration tests, allowing Maven to start the WildFly Swarm server:
 
        $ mvn clean install -Pit


* To skip building and just run the integration tests, allowing Maven to start the WildFly Swarm server:

        $ mvn integration-test -Pit

Reindex the booster catalog
---------------------------

Run the following command, replace TOKEN with the value defined in the environment variable `LAUNCHER_BACKEND_CATALOG_REINDEX_TOKEN`. Doesn't need to be specified if the environment variable doesn't exist in the running environment:

        $ curl -v -H "Content-Type: application/json" -d '{}' -X POST  https://localhost:8180/api/launchpad/catalog/reindex\?token\=TOKEN


