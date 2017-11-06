
import { Component } from "@angular/core";
import { KeycloakService } from "../../../shared/keycloak.service";
import {TokenService} from "../../../shared/token.service";

@Component({
  selector: "link-accounts",
  templateUrl: "link-accounts.page.html",
  styleUrls: ["link-accounts.page.scss"]
})
export class LinkAccountsPage {
  clusters: string[] = TokenService.clusters;
  constructor(private keycloak: KeycloakService, private tokenService: TokenService) {
  }

  isChecked(token: string): boolean {
    return this.tokenService.inValidTokens.indexOf(token) === -1;
  }
}