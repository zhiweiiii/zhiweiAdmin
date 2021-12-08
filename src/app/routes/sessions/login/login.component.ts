import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AuthService } from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isSubmitting = false;

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: [false],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('remember_me');
  }

  login() {
    this.isSubmitting = true;

    this.auth
      .login(this.username?.value, this.password?.value, this.rememberMe?.value)
      .pipe(filter(authenticated =>{
        console.log("auth",authenticated)
        return authenticated
      } ))
      .subscribe(
        () => {
          console.log("success")
          this.router.navigateByUrl('/')
        },
        err => {
           console.log("2323",err)
          if (err.status === 422) {
            console.log("2323")
            const form = this.loginForm;
            const errors = err.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        }
      );
  }
}
