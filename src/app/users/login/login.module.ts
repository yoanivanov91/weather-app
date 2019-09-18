import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-component/login.component';
import { AlertsModule } from '../../others/shared-module/alerts.module'


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    AlertsModule
  ],
  declarations: [
  	LoginComponent
  ],
  exports: [
    CommonModule,
    //ReactiveFormsModule,
  	LoginComponent
  ]
})
export class LoginModule { }
