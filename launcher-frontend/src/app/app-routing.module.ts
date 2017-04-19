import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './wizard/wizard.component';
import { IntroComponent } from './wizard/intro/intro.component';
import { VersionComponent } from './wizard/versions/versions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wizard',
    pathMatch: 'full',
  },
  {
    path: 'wizard',
    children: [
      {
        path: '',
        component: IntroComponent
      },
      {
        path: 'supported-versions',
        component: VersionComponent
      },
      {
        path: ':command/:step',
        component: FormComponent
      },
      {
        path: ':command/:step/:state',
        component: FormComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}