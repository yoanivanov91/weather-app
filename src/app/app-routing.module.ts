import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherSearchComponent } from './app-components/weather-search/weather-search.component';
import { AuthGuard } from './others/guards/auth.guard';

/*import { FavoriteListComponent } from './favorites-module/favorites-components/favorite-list/favorite-list.component';
import { LoginComponent } from './users-module/users-components/login/login.component';
import { RegisterComponent } from './users-module/users-components/register/register.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: WeatherSearchComponent, data: { title: 'Your Weather forecast' } },
	{ path: 'favorites', component: FavoriteListComponent, canActivate: [AuthGuard], data: { title: 'Favorites' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } },
	{ path: 'register', component: RegisterComponent, data: { title: 'Register' } },
	{ path: '**', redirectTo: '/home', pathMatch: 'full' }
]; */

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: WeatherSearchComponent, data: { title: 'Your Weather forecast' } },
	{ path: 'favorites', loadChildren: () => import('./favorites-module/favorites.module').then(mod => mod.FavoritesModule), canActivate: [AuthGuard], data: { title: 'Favorites' } },
	{ path: 'users', loadChildren: () => import('./users-module/users.module').then(mod => mod.UsersModule), data: { title: 'Login' } },
	//{ path: 'register', loadChildren: () => import('./users-module/users.module').then(mod => mod.UsersModule), data: { title: 'Register' } },
	{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
