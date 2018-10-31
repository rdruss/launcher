import { checkNotNull } from '../../shared/utils/Preconditions';
import { KeycloakConfig } from './authentication/KeycloakAuthenticationApi';


export const isMockAuthorization = !Boolean(process.env.REACT_APP_KEYCLOAK_CLIENT_ID);

export const isMockApi = checkNotNull(process.env.REACT_APP_API_DRIVER, 'process.env.REACT_APP_API_DRIVER') === 'mock';


export const keycloakConfig:KeycloakConfig = {
  clientId: checkNotNull(isMockApi ? 'mockClientId' : process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 'process.env.REACT_APP_KEYCLOAK_CLIENT_ID'),
  realm: checkNotNull(isMockApi ? 'mockRealm' : process.env.REACT_APP_KEYCLOAK_REALM, 'process.env.REACT_APP_KEYCLOAK_REALM'),
  url: checkNotNull(isMockApi ? 'mockUrl' : process.env.REACT_APP_KEYCLOAK_URL, 'process.env.REACT_APP_KEYCLOAK_URL'),
};

export const creatorApiUrl =
  checkNotNull(isMockApi ? 'http://mockUrl' : process.env.REACT_APP_CREATOR_API_URL, 'process.env.REACT_APP_CREATOR_API_URL');

export const launcherApiUrl =
  checkNotNull(isMockApi ? 'http://mockUrl' : process.env.REACT_APP_LAUNCHER_API_URL, 'process.env.REACT_APP_LAUNCHER_API_URL');