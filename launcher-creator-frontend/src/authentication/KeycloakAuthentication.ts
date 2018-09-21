import * as jsSHA from 'jssha';
import * as _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {KeycloakConfig} from './KeycloakConfig';
import {User} from './User';
import * as Keycloak from 'keycloak-js';

export type OptionalUser = User | undefined;

class StoredData {
  public readonly token: string;
  public readonly refreshToken?: string;
  public readonly idToken?: string;
}

export class KeycloakAuthentication  {

  private _user: OptionalUser;

  private static base64ToUri(b64: string): string {
    return b64.replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private readonly keycloak: Keycloak.KeycloakInstance;

  constructor(private config: KeycloakConfig, keycloakCoreFactory = Keycloak) {
    this.keycloak = keycloakCoreFactory(config);
  }

  public init = (): Promise<OptionalUser> => {
    return new Promise((resolve, reject) => {
      const sessionKC = KeycloakAuthentication.getStoredData();
      this.keycloak.init({ ...sessionKC })
        .error((e) => reject(e))
        .success(() => {
          this.initUser();
          resolve(this._user);
        });
    });
  };

  public get user() {
    return this._user
  }

  public login = () => {
    this.keycloak.login();
  };

  public logout = () => {
    KeycloakAuthentication.clearStoredData();
    this.keycloak.logout();
  };

  public openAccountManagement = () => {
    if (!this._user) {
      throw new Error('User is not connected.');
    }
    window.open(this.keycloak.createAccountUrl());
  };

  public refreshToken = (): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (this._user) {
        this.keycloak.updateToken(5)
          .success(() => {
            this.initUser();
            resolve(this.user);
          })
          .error(() => {
            this.logout();
            reject('Failed to refresh token');
          });
      } else {
        reject('User is not authenticated');
      }
    });
  };

  public linkAccount = (provider: string, redirect?: string): string | undefined => {
    if (!this.user) {
      return undefined;
    }
    if (this.user.accountLink[provider]) {
      return this.user.accountLink[provider];
    }
    const nonce = uuidv4();
    const clientId = this.config.clientId;
    const hash = nonce + this.user.sessionState
      + clientId + provider;
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(hash);
    const hashed = KeycloakAuthentication.base64ToUri(shaObj.getHash('B64'));
    // tslint:disable-next-line
    const link = `${this.keycloak.authServerUrl}/realms/${this.config.realm}/broker/${provider}/link?nonce=${encodeURI(nonce)}&hash=${hashed}&client_id=${encodeURI(clientId)}&redirect_uri=${encodeURI(redirect || location.href)}`;
    this.user.accountLink[provider] = link;
    return link;
  };

  private initUser() {
    if (this.keycloak.token) {
      KeycloakAuthentication.setStoredData({
        token: this.keycloak.token,
        refreshToken: this.keycloak.refreshToken,
        idToken: this.keycloak.idToken,
      });
      this._user = {
        userName: _.get(this.keycloak, 'tokenParsed.name'),
        userPreferredName: _.get(this.keycloak, 'tokenParsed.preferred_username'),
        token: this.keycloak.token,
        sessionState: _.get(this.keycloak, 'tokenParsed.session_state'),
        accountLink: {},
      };
    }
  }

  private static clearStoredData() {
    localStorage.removeItem('kc');
  }

  private static setStoredData(data: StoredData) {
    localStorage.setItem('kc', JSON.stringify(data));
  }

  private static getStoredData(): StoredData | undefined {
    const item = localStorage.getItem('kc');
    return item && JSON.parse(item);
  }
}
