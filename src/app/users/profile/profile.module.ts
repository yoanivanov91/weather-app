import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile-component/profile.component';
import { AlertsModule } from '../../others/shared-module/alerts.module'


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    AlertsModule
  ],
  declarations: [
  	ProfileComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
  	ProfileComponent
  ]
})
export class ProfileModule { }
