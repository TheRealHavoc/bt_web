import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';

const routes: Routes = [
  {path: '', title: 'Landing page', component: LandingPageComponent},
  {path: 'login', title: 'Log in', component: LogInPageComponent},
  {path: '**', title: 'Page not found', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
