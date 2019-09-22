import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { User } from '../../../others/model/user';
import { UserService } from '../../../services/services/user.service';
import { ConfirmDialogService } from '../../../services/services/confirm-dialog.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

	public selectedUserData: any;
  public selectedUser: User;
  public editedUser: User;
	public detailsForm: FormGroup;
	public inEditMode = false;
  public submitted = false;

  	constructor(private formBuilder: FormBuilder,
  				private userService: UserService,
          private confirmDialogService: ConfirmDialogService,
          private route: ActivatedRoute,
          private router: Router) {
      if (this.route.snapshot.queryParams['id']) {
            this.userService.getUserById(this.route.snapshot.queryParamMap.get('id')).subscribe(x => {
              this.selectedUserData = x;
              this.selectedUser = new User(this.selectedUserData.username, this.selectedUserData.password, this.selectedUserData.firstName, this.selectedUserData.lastName, this.selectedUserData.email);
              this.selectedUser.role = this.selectedUserData.role;
              this.selectedUser._id = this.selectedUserData._id;
              this.detailsForm = this.formBuilder.group({
            firstName: [this.selectedUser.firstName, Validators.required],
            lastName: [this.selectedUser.lastName, Validators.required],
            username: [this.selectedUser.username, Validators.required],
            password: ['12345678', [Validators.required, Validators.minLength(6)]],
            email: [this.selectedUser.email, [Validators.required, Validators.email]],
            role: [this.selectedUser.role, [Validators.required]]
        });
            });
      }
    }

  	ngOnInit() {
  	}

    ngOnDestroy() {
      this.selectedUser = null;
    }

  	deleteUser(user: User) {
      this.submitted = true;
  		this.userService.deleteUser(user);
      this.router.navigate(['/users']);
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
      this.selectedUser = this.editedUser;
      this.inEditMode = false;
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

    openEditDialog() {  
      this.confirmDialogService.confirmThis("You are about to edit the details for user " + this.f.username.value + ". Do you want to proceed?",
       () => this.updateUser(), () => this.editModeOff()
      );
    }

    openDeleteDialog(user: User) {  
      this.confirmDialogService.confirmThis("You are about to delete " + this.f.username.value + ". Do you want to proceed?",
       () => this.deleteUser(user), () => this.editModeOff()
      );
    }
}
