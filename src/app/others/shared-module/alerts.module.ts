import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts-component/alerts.component';

@NgModule({
  declarations: [
  	AlertsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  	CommonModule,
  	AlertsComponent
  ]
})
export class AlertsModule { }
