import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoriteListComponent } from './favorites-components/favorite-list/favorite-list.component';

@NgModule({
  imports: [
    CommonModule,
    FavoritesRoutingModule,
  ],
  declarations: [
  	FavoriteListComponent
  ],
  exports: [
    CommonModule,
  	FavoriteListComponent,
  ]
})
export class FavoritesModule { }
