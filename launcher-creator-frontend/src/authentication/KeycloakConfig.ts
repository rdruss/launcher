export class KeycloakConfig {
  public enabled = true;
  public clientId = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;
  public realm = process.env.REACT_APP_KEYCLOAK_REALM;
  public url= process.env.REACT_APP_KEYCLOAK_URL;
}