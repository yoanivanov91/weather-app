import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ServicesModule } from './services/services.module'

import { AppComponent } from './app.component';
import { WeatherSearchComponent } from './app-components/weather-search/weather-search.component';
import { WeatherShowModule } from './others/shared-module/weather-show.module';
import { OnClickOutsideDirective } from './others/directives/onClickOutside/on-click-outside.directive';
import { AlertsModule } from './others/shared-module/alerts.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServicesModule,
    WeatherShowModule,
    AlertsModule
  ],
  declarations: [
    AppComponent,
    WeatherSearchComponent,
    OnClickOutsideDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
