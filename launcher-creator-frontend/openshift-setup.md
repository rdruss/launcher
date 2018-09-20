# Openshift Setup

- Source image `bucharestgold/centos7-s2i-web-app`
- Build env:
```
YARN_ENABLED=true
REACT_APP_CREATOR_API_URL=https://api-creator-backend.devtools-dev.ext.devshift.net
REACT_APP_LAUNCHER_API_URL=https://forge.api.prod-preview.openshift.io/api
REACT_APP_KEYCLOAK_CLIENT_ID=openshiftio-public
REACT_APP_KEYCLOAK_REALM=rh-developers-launch
REACT_APP_KEYCLOAK_URL=https://sso.openshift.io/auth
```

