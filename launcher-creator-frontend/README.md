
# Launcher Creator Frontend

The quickest way to create and launch a full-featured service in the cloud.

[![Build Status](https://semaphoreci.com/api/v1/fabric8-launcher/launcher-creator-frontend/branches/master/badge.svg)](https://semaphoreci.com/fabric8-launcher/launcher-creator-frontend)

You can try the demo there: http://launcher-creator-frontend.devtools-dev.ext.devshift.net/

[Doc to setup CD on OpenShift ](./openshift-setup.md)


## Dev

### Components documentation (style-guide)
https://fabric8-launcher.github.io/launcher-creator-frontend/

### Use only mock data
```bash
$ yarn install
$ yarn start:mock-api
```

### Use staging backends
```bash
$ yarn install
$ yarn start:staging-api
```

### Use local backends
```bash
$ yarn install
$ yarn start:local-api
```

By default authentication will be disabled in this mode. If you want to use KeyCloak set the following environment vars:
```
REACT_APP_AUTHENTICATION=keycloak
REACT_APP_KEYCLOAK_CLIENT_ID=<clientId>
REACT_APP_KEYCLOAK_REALM=<realm>
REACT_APP_KEYCLOAK_URL=<url>
```

### Use a custom environment

Create a `.env.custom` file for your personal use (it will be gitignored)
```bash
$ yarn install
$ yarn start:custom
```

## Test

```bash
$ yarn install
$ yarn test
```

## Build

```bash
$ yarn install
$ yarn build
```

## Serve build

```bash
$ yarn install
$ yarn build
$ yarn serve
```

## Patternfly doc
http://patternfly-react.surge.sh/patternfly-4/components/


