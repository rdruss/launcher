# Openshift Setup

- Source image `bucharestgold/centos7-s2i-web-app`
- Build env:
```
YARN_ENABLED=true
REACT_APP_CREATOR_API_URL=http://api-creator-backend.devtools-dev.ext.devshift.net
```

- Deploy env:
```
NPM_RUN=serve -s /opt/app-root/output -l 8080
```
