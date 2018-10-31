import axios from 'axios';
import { KeycloakAuthenticationApi } from './authentication/KeycloakAuthenticationApi';
import { authenticationMode, creatorApiUrl, isMockApi, keycloakConfig, launcherApiUrl } from './ApiConfig';
import { MockCreatorApi } from './creator/__mocks__/MockCreatorApi';
import AxiosCreatorApi from './creator/AxiosCreatorApi';
import MockLauncherApi from './launcher/__mocks__/MockLauncherApi';
import AxiosLauncherApi from './launcher/AxiosLauncherApi';
import { LauncherApi } from './launcher/LauncherApi';
import { CreatorApi } from './creator/CreatorApi';
import MockAuthenticationApi from './authentication/__mocks__/MockAuthenticationApi';
import NoAuthenticationApi from './authentication/NoAuthenticationApi';


export function newKeycloakAuthenticationApi() {
  switch (authenticationMode) {
    case 'no':
      return new NoAuthenticationApi();
    case 'mock':
      return new MockAuthenticationApi();
    case 'keycloak':
      return new KeycloakAuthenticationApi(keycloakConfig!);
    default:
      throw new Error(`Invalid authentication mode: ${authenticationMode}`);
  }
}

export const creatorApiAxios = axios.create({
  baseURL: creatorApiUrl,
});

export function newCreatorApi(): CreatorApi {
  return isMockApi ? new MockCreatorApi() : new AxiosCreatorApi(creatorApiAxios);
}

export const launcherApiAxios = axios.create({
  baseURL: launcherApiUrl,
});

export function newLauncherApi(): LauncherApi {
  return isMockApi ? new MockLauncherApi() : new AxiosLauncherApi(launcherApiAxios);
}