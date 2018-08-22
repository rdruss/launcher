import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'getting-started',
  styleUrls: ['./getting-started.component.scss'],
  templateUrl: './getting-started.component.html'
})
export class GettingStartedComponent {
  public projectName: string = '';

  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private router: Router) {
  }

  public cancel(): void {
    this.router.navigate(['/']);
  }

  public routeToApp(): void {
    this.router.navigate(['/wizard', this.projectName]);
  }
}
