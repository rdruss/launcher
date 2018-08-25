import {User} from "./user";

export abstract class Authentication {
  protected _user?: User;

  public abstract init(): Promise<void>;

  public abstract login(): Promise<User | undefined>;

  public abstract isEnabled(): boolean;

  public abstract getToken(): Promise<string>;

  public abstract linkAccount(provider: string, redirect?: string): string | undefined;

  get user(): User | undefined {
    return this._user;
  }

  public logout() {
    this.clearUser();
  }

  public isAuthenticated(): boolean {
    if (!this.isEnabled()) {
      return true;
    }
    return Boolean(this.user);
  }

  protected clearUser() {
    this._user = undefined;
  }
}
