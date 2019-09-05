import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FavoritesModule } from './favorites-module/favorites.module';
import { UsersModule } from './users-module/users.module'
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GetWeatherService } from './others/services/getweather.service';
import { FavoriteService } from './others/services/favorite.service';
import { RestApiService } from './others/services/restapi.service';
import { AuthenticationService } from './others/services/authentication.service';

import { JwtInterceptor } from './others/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './others/interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { WeatherSearchComponent } from './app-components/weather-search/weather-search.component';
import { WeatherShowComponent } from './app-components/weather-show/weather-show.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FavoritesModule,
    UsersModule
  ],
  declarations: [
    AppComponent,
    WeatherSearchComponent,
    WeatherShowComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    Title,
    GetWeatherService,
    FavoriteService,
    RestApiService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
