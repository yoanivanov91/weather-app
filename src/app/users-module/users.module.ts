import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './users-components/login/login.component';
import { RegisterComponent } from './users-components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [
  	LoginComponent,
  	RegisterComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
  	LoginComponent,
  	RegisterComponent
  ]
})
export class UsersModule { }
