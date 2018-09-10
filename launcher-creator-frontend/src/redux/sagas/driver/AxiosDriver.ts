import axios from 'axios';
import { createDriver } from 'redux-saga-requests-axios';

const axiosInstance = axios.create({
  baseURL: 'http://public-creator-catalog.dev.rdu2c.fabric8.io',
});

const driver = createDriver(axiosInstance);

export default driver;