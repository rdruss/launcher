import axios from 'axios';
import { KeycloakAuthenticationApi } from './authentication/KeycloakAuthenticationApi';
import { creatorApiUrl, isMockApi, isMockAuthorization, keycloakConfig, launcherApiUrl } from './ApiConfig';
import { MockCreatorApi } from './creator/__mocks__/MockCreatorApi';
import AxiosCreatorApi from './creator/AxiosCreatorApi';
import MockLauncherApi from './launcher/__mocks__/MockLauncherApi';
import AxiosLauncherApi from './launcher/AxiosLauncherApi';
import { LauncherApi } from './launcher/LauncherApi';
import { CreatorApi } from './creator/CreatorApi';
import MockAuthenticationApi from './authentication/__mocks__/MockAuthenticationApi';


export function newKeycloakAuthenticationApi() {
  return isMockAuthorization ? new MockAuthenticationApi() : new KeycloakAuthenticationApi(keycloakConfig);
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