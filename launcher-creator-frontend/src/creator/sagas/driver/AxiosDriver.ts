import axios from 'axios';
import { createDriver } from 'redux-saga-requests-axios';

const creatorApiAxios = axios.create({
  baseURL: process.env.REACT_APP_CREATOR_API_URL,
});

const launcherApiAxios = axios.create({
  baseURL: process.env.REACT_APP_LAUNCHER_API_URL,
});


const driver = {
  default: createDriver(creatorApiAxios),
  launcher: createDriver(launcherApiAxios),
};

export default driver;