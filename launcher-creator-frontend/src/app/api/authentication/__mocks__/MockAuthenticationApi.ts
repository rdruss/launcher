import { AuthenticationApi, OptionalUser, User } from '../AuthenticationApi';

const mockUser: User = {
  userName: 'Anonymous',
  userPreferredName: 'Anonymous',
  token: 'eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo',
  sessionState: 'sessionState',
  accountLink: {},
};

export default class MockAuthenticationApi implements AuthenticationApi {
  private _user: OptionalUser;
  public init = (): Promise<OptionalUser> => {
    return Promise.resolve(this._user);
  }

  public linkAccount = (provider: string, redirect?: string): string | undefined => {
    alert('Account management is not available on mock mode.');
    return '';
  }

  public login= (): void => {
    this._user = mockUser;
  }

  public logout = (): void => {
    this._user = undefined;
  }

  public openAccountManagement = (): void => {
    alert('Account management is not available on mock mode.');
  }

  public refreshToken = (): Promise<OptionalUser> => {
    return Promise.resolve(this._user);
  }

  public get user() {
    return this._user;
  }

  public get enabled(): boolean {
    return true;
  }
}