import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GetWeatherService } from './services/getweather.service'
import { FavoriteService } from './services/favorite.service'
import { RestApiService } from './services/restapi.service'

import { AppComponent } from './app.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { WeatherShowComponent } from './weather-show/weather-show.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherSearchComponent,
    WeatherShowComponent,
    FavoriteListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GetWeatherService,
    FavoriteService,
    RestApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
