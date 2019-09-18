import { Injectable } from '@angular/core';
import { User } from '../../others/model/user';
import { AuthenticationService } from './authentication.service';
import { RestApiService } from './restapi.service';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: User[] = [];
  private currentUser: any;

  constructor(private restapi: RestApiService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getUsers();
  }

  async getUsers() {
    if(this.currentUser && this.currentUser.role === 'Admin') {
      await this.restapi.getUsers().subscribe(users => this.userList = users);
    }
  }

  getUserList(): User[] {
    return this.userList;
  }

  emptyUserList() {
    this.userList = [];
  }

  deleteUser(user: User) {
  	if(this.currentUser.role === 'Admin' && user.role !== 'Admin') {
	    this.restapi.deleteUser(user).subscribe(() => {
	      let index = this.userList.findIndex(x => x.username === user.username);
	      if (index > -1) {
	        this.userList.splice(index, 1);
          this.alertService.sendMessage(user.username + ' was successfully removed', 'success');
	        console.log("Successfully removed " + user.username);
	        this.getUsers();
	      }
	     },
       error => this.alertService.sendMessage(error, 'error')
  	)};
  }

  updateUser(user: User) {
    //if(this.currentUser.role === 'Admin' && user.role !== 'Admin') {
      return this.restapi.updateUser(user).subscribe(() => { 
         this.alertService.sendMessage(user.username + ' was successfully updated', 'success');
         this.getUsers();
         console.log("Successfully updated " + user.username);
     }, error => this.alertService.sendMessage(error, 'error'));
    //}
  }

  updateUserProfile(user: User) {
    //if(this.currentUser.role === 'Admin' && user.role !== 'Admin') {
      return this.restapi.updateUser(user).subscribe(() => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authenticationService.setCurrentUserValue(user); 
        this.alertService.sendMessage('Your details were successfully updated', 'success');
        this.getUsers();
        console.log(this.currentUser);
     }, error => this.alertService.sendMessage(error, 'error'));
    //}
  }

}
