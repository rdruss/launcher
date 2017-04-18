import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  constructor(private router: Router) {}

  launch() {
    this.router.navigate(['/wizard', "launchpad-new-project", 0]);
  }

  versions() {
    this.router.navigate(['/wizard', 'supported-versions']);
  }
}