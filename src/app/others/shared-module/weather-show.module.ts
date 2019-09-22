import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherShowComponent } from './weather-show/weather-show.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { ToasterModule } from '../../others/shared-module/toaster.module';

@NgModule({
  declarations: [
  	WeatherShowComponent,
    WeatherIconComponent
  ],
  imports: [
    CommonModule,
    ToasterModule
  ],
  exports: [
  	CommonModule,
  	WeatherShowComponent,
    WeatherIconComponent
  ]
})
export class WeatherShowModule { }
