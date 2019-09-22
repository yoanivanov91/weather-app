import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';    
  
@NgModule({
	imports: [
		CommonModule
	],
    declarations: [  
        ConfirmDialogComponent  
    ],  
    exports: [  
    	CommonModule,
        ConfirmDialogComponent  
    ]  
})  
export class ConfirmDialogModule {  
}  