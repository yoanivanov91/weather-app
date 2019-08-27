import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';


const routes: Routes = [
	{ path: 'home', component: WeatherSearchComponent },
	{ path: 'favorites', component: FavoriteListComponent },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
