import { checkNotNull } from '../../shared/utils/Preconditions';
import { KeycloakConfig } from './authentication/KeycloakAuthenticationApi';


export const authenticationMode = checkNotNull(process.env.REACT_APP_AUTHENTICATION, 'process.env.REACT_APP_AUTHENTICATION');
export const isKeycloakMode = authenticationMode === 'keycloak';

export const isMockApi = checkNotNull(process.env.REACT_APP_API, 'process.env.REACT_APP_API') === 'mock';

export const keycloakConfig: KeycloakConfig | undefined = isKeycloakMode ? {
  clientId: checkNotNull(process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 'process.env.REACT_APP_KEYCLOAK_CLIENT_ID'),
  realm: checkNotNull(process.env.REACT_APP_KEYCLOAK_REALM, 'process.env.REACT_APP_KEYCLOAK_REALM'),
  url: checkNotNull(process.env.REACT_APP_KEYCLOAK_URL, 'process.env.REACT_APP_KEYCLOAK_URL'),
}: undefined;

export const creatorApiUrl =
  checkNotNull(isMockApi ? 'http://mockUrl' : process.env.REACT_APP_CREATOR_API_URL, 'process.env.REACT_APP_CREATOR_API_URL');

export const launcherApiUrl =
  checkNotNull(isMockApi ? 'http://mockUrl' : process.env.REACT_APP_LAUNCHER_API_URL, 'process.env.REACT_APP_LAUNCHER_API_URL');