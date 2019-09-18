import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../others/model/user';
import { UserService } from '../../../services/services/user.service';
import { AlertService } from '../../../services/services/alert.service';



@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges  {

	public selectedUser: User;
	public usersForm: FormGroup;
  public submitted = false;
  

  	constructor(private formBuilder: FormBuilder,
          private userService: UserService,
          private alertService: AlertService) {
  		this.userService.getUsers();
  	}

  	ngOnInit() {
  		this.usersForm = this.formBuilder.group({
            user: []
        });
  	}

    ngOnChanges() {
      this.userService.getUsers();
    }

  	userList() {
      return this.userService.getUserList();
    }

  	get f() { return this.usersForm.controls; }

  	onSubmit() {
      if(!this.f.user.value) {
        this.submitted = false;
        this.alertService.sendMessage('Please select an user', 'error');
        return;
      }
      this.alertService.clearMessage();
      this.submitted = true;
  		this.selectedUser = this.f.user.value;
  	}

    closeDetails() {
      this.selectedUser = null;
    }

}

