import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../others/model/user';
import { UserService } from '../../../services/services/user.service';
import { AuthenticationService } from '../../../services/services/authentication.service';
import { ConfirmDialogService } from '../../../services/services/confirm-dialog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  	public currentUser: any;
  	public editedUser: User;
	  public detailsForm: FormGroup;
	  public inEditMode = false;
  	public message: string;
  	public submitted = false;

  	constructor(private formBuilder: FormBuilder,
  				private userService: UserService,
  				private authenticationService: AuthenticationService,
          private confirmDialogService: ConfirmDialogService) {
  				this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
          console.log(this.currentUser);
  	}

  	ngOnInit() {
  		//console.log(this.currentUser);
  		this.detailsForm = this.formBuilder.group({
            firstName: [this.currentUser.firstName, Validators.required],
            lastName: [this.currentUser.lastName, Validators.required],
            username: [this.currentUser.username, Validators.required],
            password: ['12345678', [Validators.required, Validators.minLength(6)]],
            email: [this.currentUser.email, [Validators.required, Validators.email]],
            role: [this.currentUser.role, [Validators.required]]
        });
  	}

    updateUserProfile() {
      this.submitted = true;

      if(this.detailsForm.invalid) {
        return;
      }
      
      this.editedUser = new User(this.f.username.value, this.userPassword(), this.f.firstName.value, this.f.lastName.value, this.f.email.value);
      this.editedUser.role = this.f.role.value;
      this.editedUser._id = this.currentUser._id;
      this.editedUser.token = this.currentUser.token;
      this.userService.updateUserProfile(this.editedUser);
      setTimeout(() => this.editModeOff(), 100);
      
    }

    get f() { return this.detailsForm.controls; }

    userPassword(): String {
      let password;
      if(this.f.password.value==='12345678') {
        password = null;
      }
      else { password = this.f.password.value }
      return password;
    }

    editModeOn() {
      this.inEditMode = true;
      this.message = null;
    }

    editModeOff() {
      this.inEditMode = false;
      this.setValues();
    }

    setValues() {
      this.f.username.setValue(this.currentUser.username);
      this.f.password.setValue('12345678');
      this.f.firstName.setValue(this.currentUser.firstName);
      this.f.lastName.setValue(this.currentUser.lastName);
      this.f.email.setValue(this.currentUser.email);
      this.f.role.setValue(this.currentUser.role);
    }

    openDialog() {  
      this.confirmDialogService.confirmThis("You are about to edit your details. Do you want to proceed?",
       () => this.updateUserProfile(), () => this.editModeOff()
      );
    }  

    ngOnDestroy() {
      this.currentUser = null;
    }

}

