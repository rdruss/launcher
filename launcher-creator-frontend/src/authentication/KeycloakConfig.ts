import { checkNotNull } from '../utils/Preconditions';

export class KeycloakConfig {
  public enabled = true;
  public clientId = checkNotNull(process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 'process.env.REACT_APP_KEYCLOAK_CLIENT_ID');
  public realm = checkNotNull(process.env.REACT_APP_KEYCLOAK_REALM, 'process.env.REACT_APP_KEYCLOAK_REALM');
  public url= checkNotNull(process.env.REACT_APP_KEYCLOAK_URL, 'process.env.REACT_APP_KEYCLOAK_URL');
}