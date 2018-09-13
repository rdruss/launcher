import axios from 'axios';
import { createDriver } from 'redux-saga-requests-axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const driver = createDriver(axiosInstance);

export default driver;