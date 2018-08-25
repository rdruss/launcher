import * as jsSHA from 'jssha';
import * as _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {Authentication} from './authentication';
import {KeycloakConfig} from './keycloak-config';
import {User} from "./user";
import * as Keycloak from "keycloak-js";

export class KeycloakAuthentication extends Authentication {

  private static base64ToUri(b64: string): string {
    return b64.replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private logoutUrl?: string;
  private readonly keycloak?: Keycloak.KeycloakInstance;

  constructor(private config: KeycloakConfig, keycloakCoreFactory = Keycloak, private doRedirect = (url) => window.location.href = url ) {
    super();
    if (this.config.enabled) {
      this.keycloak = keycloakCoreFactory(config);
    }
  }

  public init(): Promise<void> {
    if (!this.keycloak) {
        return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      this.keycloak.init({ })
        .error(() => reject())
        .success(() => {
          this.initUser();
          // tslint:disable-next-line
          this.logoutUrl = `${this.keycloak.authServerUrl}/realms/${this.config.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;

          resolve();
        });
    });
  }

  public login(): Promise<User | undefined> {
    return new Promise<User>((resolve, reject) => {
      if (!this.keycloak) {
        return resolve(undefined);
      }
      this.keycloak.login()
        .success(() => {
          this.initUser();
          resolve(this.user);
        })
        .error(() => {
          reject(new Error('Failed to login'));
        });
    });
  }

  public logout() {
    super.logout();
    if (this.keycloak) {
      this.keycloak.clearToken();
      if (!this.logoutUrl) {
        throw new Error('Logout url must be set in order to logout.');
      }
      this.doRedirect(this.logoutUrl);
    }
  }

  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.keycloak) {
        if (this.isAuthenticated()) {
          this.keycloak.updateToken(5)
            .success(() => {
              resolve(this.user && this.user.token);
            })
            .error(() => {
              this.logout();
              reject('Failed to refresh token');
            });
        } else {
          reject('User is not authenticated');
        }
      } else {
        resolve(undefined);
      }
    });
  }

  public isEnabled(): boolean {
    return Boolean(this.keycloak);
  }

  public linkAccount(provider: string, redirect?: string): string | undefined {
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
  }

  private initUser() {
    if (this.keycloak.token) {
      this._user = {
        name: _.get(this.keycloak, 'tokenParsed.name'),
        preferredName: _.get(this.keycloak, 'tokenParsed.preferred_username'),
        token: this.keycloak.token,
        sessionState: _.get(this.keycloak, 'tokenParsed.session_state'),
        accountLink: {},
      };
    }
  }
}
