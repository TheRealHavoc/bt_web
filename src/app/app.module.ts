import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { MenuTopBarComponent } from './components/menu-top-bar/menu-top-bar.component';
import { OrDividerComponent } from './components/or-divider/or-divider.component';
import { FullLoaderComponent } from './components/full-loader/full-loader.component';
import { MatchPageComponent } from './pages/match-page/match-page.component';
import { DividerComponent } from './components/divider/divider.component';
import { SmallLoaderComponent } from './components/small-loader/small-loader.component';
import { PlayerPlateLobbyComponent } from './components/player-plate-lobby/player-plate-lobby.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AccountInformationViewComponent } from './views/account-information-view/account-information-view.component';
import { LobbyViewComponent } from './views/lobby-view/lobby-view.component';
import { BattleViewComponent } from './views/battle-view/battle-view.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { CharactersPageComponent } from './pages/characters-page/characters-page.component';
import { PlayViewComponent } from './views/play-view/play-view.component';
import { CharacterCardSmallComponent } from './components/character-card-small/character-card-small.component';
import { CookieModalComponent } from './components/cookie-modal/cookie-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LandingPageComponent,
    AlertsComponent,
    LogInPageComponent,
    MenuPageComponent,
    RegisterPageComponent,
    CharacterCardComponent,
    CharacterPageComponent,
    MenuTopBarComponent,
    OrDividerComponent,
    FullLoaderComponent,
    MatchPageComponent,
    DividerComponent,
    SmallLoaderComponent,
    PlayerPlateLobbyComponent,
    AccountPageComponent,
    AccountInformationViewComponent,
    LobbyViewComponent,
    BattleViewComponent,
    MenuButtonComponent,
    CharactersPageComponent,
    PlayViewComponent,
    CharacterCardSmallComponent,
    CookieModalComponent,
    FooterComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
