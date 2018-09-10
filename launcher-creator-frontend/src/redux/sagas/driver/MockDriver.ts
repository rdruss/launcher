import { createDriver } from 'redux-saga-requests-mock';
import { CapabilitiesAction } from '../../actions';

const toData = (content) => ({ data: content });

const mock  = {
  [CapabilitiesAction.FETCH_CAPABILITIES]: (requestConfig, requestAction) => {
    // tslint:disable-next-line
    return toData([{"module":"database","name":"Database","description":"Adds Database capability to the user's project","props":{"databaseType":{"name":"Database Type","description":"The type of database to use","required":true,"type":"enum","values":[{"id":"postgresql","name":"PostgreSQL"},{"id":"mysql","name":"mySQL"}]},"runtime":{"name":"Runtime Type","description":"The type of runtime to use","required":true,"type":"enum","values":[{"id":"nodejs","name":"Node.js"},{"id":"springboot","name":"Spring Boot"},{"id":"thorntail","name":"Thorntail"},{"id":"vertx","name":"Vert.x"}]}}},{"module":"rest","name":"REST","description":"Adds REST capability to the user's project","props":{"runtime":{"name":"Runtime Type","description":"The type of runtime to use","required":true,"type":"enum","values":[{"id":"nodejs","name":"Node.js"},{"id":"springboot","name":"Spring Boot"},{"id":"thorntail","name":"Thorntail"},{"id":"vertx","name":"Vert.x"}]}}}]);
  },
};
const driver = createDriver(mock, { timeout: 500 });

export default driver;