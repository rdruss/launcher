
# Launcher Creator Frontend

The quickest way to create and launch a full-featured service on the cloud.

[![Build Status](https://semaphoreci.com/api/v1/fabric8-launcher/launcher-creator-frontend/branches/master/badge.svg)](https://semaphoreci.com/fabric8-launcher/launcher-creator-frontend)

You can try the demo there: http://launcher-creator-frontend.devtools-dev.ext.devshift.net/

[Doc to setup CD on OpenShift ](./openshift-setup.md)


## Dev

### Components documentation (style-guide)
https://fabric8-launcher.github.io/launcher-creator-frontend/

### Use only mock data
```bash
$ yarn install
$ yarn start:mock
```

### Use staging backends
```bash
$ yarn install
$ yarn start:staging
```

### Use local backends
```bash
$ yarn install
$ yarn start:local
```

Set those env to enable KeyCloak in local mode:
```
REACT_APP_KEYCLOAK_CLIENT_ID=<clientId>
REACT_APP_KEYCLOAK_REALM=<realm>
REACT_APP_KEYCLOAK_URL=<url>
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


