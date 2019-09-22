import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list-component/user-list.component';
import { UserDetailsComponent } from './user-details-component/user-details.component';

const routes: Routes = [
	{ path: '', component: UserListComponent },
	{ path: 'edit', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
