import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../../../others/model/user';

import { RestApiService } from '../../../others/services/restapi.service';
import { AuthenticationService } from '../../../others/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public loading = false;
    public submitted = false;
    public error: String;
    private user: User;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private restapi: RestApiService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

  		this.user = new User(this.f.username.value, this.f.password.value, this.f.firstName.value,
  							 this.f.lastName.value, this.f.email.value);
        this.loading = true;
        this.restapi.registerUser(this.user)
            .pipe(first())
            .subscribe(
                () => {
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
