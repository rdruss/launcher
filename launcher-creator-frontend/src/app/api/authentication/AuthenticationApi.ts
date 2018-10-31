export class User {
  public token: string;
  public accountLink: object;
  public userName: string;
  public userPreferredName: string;
  public sessionState: string;
}

export type OptionalUser = User | undefined;

export interface AuthenticationApi {
  readonly user: OptionalUser;
  init(): Promise<OptionalUser>;
  login(): void;
  logout(): void;
  openAccountManagement(): void;
  refreshToken(): Promise<OptionalUser>;
  linkAccount(provider: string, redirect?: string): (string | undefined);
}