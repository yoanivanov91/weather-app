import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherShowComponent } from '../../app-components/weather-show/weather-show.component';

@NgModule({
  declarations: [
  	WeatherShowComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  	CommonModule,
  	WeatherShowComponent
  ]
})
export class WeatherShowModule { }
