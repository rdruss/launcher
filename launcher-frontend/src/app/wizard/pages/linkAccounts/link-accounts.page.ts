
import { Component } from "@angular/core";
import {TokenService} from "../../../shared/token.service";
import {KeycloakService} from "../../../shared/keycloak.service";

@Component({
  selector: "link-accounts",
  templateUrl: "link-accounts.page.html",
  styleUrls: ["link-accounts.page.scss"]
})
export class LinkAccountsPage {
  clusters: string[] = [];

  constructor(private tokenService: TokenService, private keycloak: KeycloakService) {
    this.clusters = tokenService.clusters;
  }

  isChecked(token: string): boolean {
    return this.tokenService.inValidTokens.indexOf(token) === -1;
  }
}