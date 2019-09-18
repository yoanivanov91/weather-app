import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../others/model/user';
import { UserService } from '../../../services/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

	@Input() public selectedUser;
  public editedUser: User;
	public detailsForm: FormGroup;
	public inEditMode = false;
  public submitted = false;

  	constructor(private formBuilder: FormBuilder,
  				private userService: UserService) { }

  	ngOnInit() {
  		console.log(this.selectedUser);
  		this.detailsForm = this.formBuilder.group({
            firstName: [this.selectedUser.firstName, Validators.required],
            lastName: [this.selectedUser.lastName, Validators.required],
            username: [this.selectedUser.username, Validators.required],
            password: ['12345678', [Validators.required, Validators.minLength(6)]],
            email: [this.selectedUser.email, [Validators.required, Validators.email]],
            role: [this.selectedUser.role, [Validators.required]]
        });
  	}

  	deleteUser(user: User) {
      this.submitted = true;
  		this.userService.deleteUser(user);
  	}

    updateUser() {
      this.submitted = true;

      if(this.detailsForm.invalid) {
        return;
      }
      
      this.editedUser = new User(this.f.username.value, this.userPassword(), this.f.firstName.value, this.f.lastName.value, this.f.email.value);
      this.editedUser.role = this.f.role.value;
      this.editedUser._id = this.selectedUser._id;
      this.userService.updateUser(this.editedUser);
    }

    userPassword(): String {
      let password;
      if(this.f.password.value==='12345678') {
        password = null;
      }
      else { password = this.f.password.value }
      return password;
    }

  	isAdmin(): boolean {
  		return this.selectedUser.role==='Admin' ? true : false;
  	}

    get f() { return this.detailsForm.controls; }

    editModeOn() {
      this.inEditMode = true;
      
    }

    editModeOff() {
      this.inEditMode = false;
      this.setValues();
    }

    setValues() {
      this.f.username.setValue(this.selectedUser.username);
      this.f.password.setValue('12345678');
      this.f.firstName.setValue(this.selectedUser.firstName);
      this.f.lastName.setValue(this.selectedUser.lastName);
      this.f.email.setValue(this.selectedUser.email);
      this.f.role.setValue(this.selectedUser.role);
    }

}
