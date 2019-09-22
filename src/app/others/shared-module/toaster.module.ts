import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster/toaster.component';



@NgModule({
  declarations: [
  	ToasterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  	CommonModule,
  	ToasterComponent
  ]
})
export class ToasterModule { }
