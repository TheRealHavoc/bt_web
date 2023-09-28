import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { MatchPageComponent } from './pages/match-page/match-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AccountInformationViewComponent } from './views/account-information-view/account-information-view.component';
import { CharactersPageComponent } from './pages/characters-page/characters-page.component';
import { MatchResolver } from './resolvers/match.resolver';

const routes: Routes = [
  {path: '', title: 'Landing page', component: LandingPageComponent},
  {path: 'login', title: 'Log in', component: LogInPageComponent},
  {path: 'register', title: 'Register', component: RegisterPageComponent},
  {path: 'game', canActivate: [AuthGuard], children: [
    {path: '', title: 'Menu', component: MenuPageComponent, pathMatch: 'full'},
    {path: 'characters', canActivate: [AuthGuard], children: [
      {path: '', title: 'Characters', component: CharactersPageComponent, pathMatch: 'full'},
      {path: ':id', title: 'Character', component: CharacterPageComponent},
    ]},
    {path: 'match', resolve: {match: MatchResolver}, title: 'Match', component: MatchPageComponent},
    {path: 'account', component: AccountPageComponent, children: [
      {path: '', title: 'Account information', component: AccountInformationViewComponent, pathMatch: 'full'},
    ]}
  ]},
  {path: '**', title: 'Page not found', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
