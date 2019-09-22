import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ServicesModule } from './services/services.module'

import { AppComponent } from './app.component';
import { WeatherSearchComponent } from './app-components/weather-search/weather-search.component';
import { CurrentLocationComponent } from './app-components/current-location/current-location.component';
import { LoadingScreenComponent } from './app-components/loading-screen/loading-screen.component';

import { WeatherShowModule } from './others/shared-module/weather-show.module';
import { OnClickOutsideDirective } from './others/directives/onClickOutside/on-click-outside.directive';
import { AlertsModule } from './others/shared-module/alerts.module';
import { ConfirmDialogModule } from './others/shared-module/confirm-dialog.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServicesModule,
    WeatherShowModule,
    AlertsModule,
    ConfirmDialogModule
  ],
  declarations: [
    AppComponent,
    WeatherSearchComponent,
    OnClickOutsideDirective,
    CurrentLocationComponent,
    LoadingScreenComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
