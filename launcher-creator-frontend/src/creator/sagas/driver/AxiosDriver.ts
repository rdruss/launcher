import axios from 'axios';
import { createDriver } from 'redux-saga-requests-axios';

const axiosInstance = axios.create({
  baseURL: 'http://api-creator-backend.dev.rdu2c.fabric8.io',
});

const driver = createDriver(axiosInstance);

export default driver;