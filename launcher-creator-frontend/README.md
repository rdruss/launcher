
# Launcher Creator Frontend

The quickest way to create and launch a full-featured service on the cloud.

[![Build Status](https://semaphoreci.com/api/v1/fabric8-launcher/launcher-creator-frontend/branches/master/badge.svg)](https://semaphoreci.com/fabric8-launcher/launcher-creator-frontend)

You can try the demo there: http://launcher-creator-frontend.devtools-dev.ext.devshift.net/

[Doc to setup CD on OpenShift ](./openshift-setup.md)


## Dev

### Use mock data
```bash
$ yarn install
$ yarn start:mock
```

### Use api (env: REACT_APP_CREATOR_API_URL)
```bash
$ yarn install
$ yarn start:api
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


