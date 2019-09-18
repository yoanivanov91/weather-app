import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoriteListComponent } from './favorites-components/favorite-list/favorite-list.component';
import { WeatherShowModule } from '../others/shared-module/weather-show.module';

@NgModule({
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    WeatherShowModule
  ],
  declarations: [
  	FavoriteListComponent
  ],
  exports: [
    CommonModule,
  	FavoriteListComponent
  ]
})
export class FavoritesModule { }
