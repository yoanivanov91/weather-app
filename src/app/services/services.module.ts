import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { GetWeatherService } from './services/getweather.service';
import { FavoriteService } from './services/favorite.service';
import { RestApiService } from './services/restapi.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { ConfirmDialogService } from './services/confirm-dialog.service';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
  	{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    Title,
    GetWeatherService,
    FavoriteService,
    RestApiService,
    AuthenticationService,
    UserService,
    AlertService,
    ConfirmDialogService
  ]
})
export class ServicesModule {

	//prevents the services from being injected twice from the lazy modules
	constructor(@Optional() @SkipSelf() core: ServicesModule) {
		if(core) {
			throw new Error('Service is already provided');
		}
	}
}
