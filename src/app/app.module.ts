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

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LandingPageComponent,
    AlertsComponent,
    LogInPageComponent,
    MenuPageComponent
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
