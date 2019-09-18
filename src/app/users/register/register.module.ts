import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register-component/register.component';
import { AlertsModule } from '../../others/shared-module/alerts.module'


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    AlertsModule
  ],
  declarations: [
  	RegisterComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
  	RegisterComponent
  ]
})
export class RegisterModule { }
