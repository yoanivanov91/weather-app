import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list-component/user-list.component';
import { UserDetailsComponent } from './user-details-component/user-details.component';
import { AlertsModule } from '../../others/shared-module/alerts.module';
import { ConfirmDialogModule } from '../../others/shared-module/confirm-dialog.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserListRoutingModule,
    AlertsModule,
    ConfirmDialogModule
  ],
  declarations: [
    UserListComponent,
    UserDetailsComponent
  ],
  exports: [
    CommonModule,
    UserListComponent,
    UserDetailsComponent
  ]
})
export class UserListModule { }
