import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherSearchComponent } from './app-components/weather-search/weather-search.component';
import { AuthGuard } from './others/guards/auth.guard';
import { AdminGuard } from './others/guards/admin.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: WeatherSearchComponent, data: { title: 'Your Weather forecast' } },
	{ path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(mod => mod.FavoritesModule), canActivate: [AuthGuard], data: { title: 'Favorites' } },
	{ path: 'login', loadChildren: () => import('./users/login/login.module').then(mod => mod.LoginModule) },
	{ path: 'register', loadChildren: () => import('./users/register/register.module').then(mod => mod.RegisterModule), data: { title: 'Register' } },
	{ path: 'users', loadChildren: () => import('./users/user-list/user-list.module').then(mod => mod.UserListModule), canActivate: [AdminGuard], data: { title: 'Users' } },
	{ path: 'profile', loadChildren: () => import('./users/profile/profile.module').then(mod => mod.ProfileModule), canActivate: [AuthGuard], data: { title: 'Profile' } },
	{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
