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
    OrDividerComponent
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
