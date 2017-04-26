import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  constructor(private router: Router) {}

  launch() {
    this.router.navigate(['/wizard', "launchpad-new-project", 1, "eyJpbnB1dHMiOltdfQ=="]);
  }
}