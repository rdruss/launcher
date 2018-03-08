Fabric8-Launcher Frontend
=========================

[![Build Status](https://ci.centos.org/view/Devtools/job/devtools-launcher-frontend-generator-build-master/badge/icon)](https://ci.centos.org/view/Devtools/job/devtools-launcher-frontend-generator-build-master/)
[![License](https://img.shields.io/:license-Apache2-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

If this is the first time you are starting the UI, you need to run

```bash
$ npm install
```

If you trying to refresh your install you can run:

```bash
$ npm run reinstall
```

Start the app by executing the following.

```bash
$ npm start
```

If you want the UI to use a local version of the backend, you need to set the following environment variables:

```bash   
$ export LAUNCHER_BACKEND_URL=http://localhost:8080/api/
$ export LAUNCHER_MISSIONCONTROL_URL=ws://localhost:8080
```

More details on running a local version of the backend are available [here][2].

## Production Build

Location of the [backend][2] can be determined at runtime (via `settings.json`) or at build time.
If `LAUNCHER_BACKEND_URL` environment variable is set at build time, this value will be used to connect to the backend.
Otherwise [settings.json][1] will be fetched at runtime and the contents used connect to the backend.

To generate production build, set the backend url (the host and port of where
[backend][2] is deployed) either in the [settings.json][1] or as `LAUNCHER_BACKEND_URL` environment variable
and run the `npm` command as given below:

```bash
npm run build:prod
```

The build output will be under `dist` directory.

[1]: https://github.com/fabric8-launcher/launcher-frontend/blob/master/src/assets/settings.json
[2]: https://github.com/fabric8-launcher/launcher-backend