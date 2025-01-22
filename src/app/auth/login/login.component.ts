import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePwdButton: boolean = true;

  constructor(fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    });
  }

  login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.apiService.login(loginInfo).subscribe({
      next: res => {
        // console.log(res);
        if(res == 'Not Found !') this.snackBar.open('Credentials are INVALID !', 'OK', {duration: 2000});
        else if(res == 'Unapproved') this.snackBar.open('Your account is not yet approved by ADMIN', 'OK', {duration: 2000});
        else {
          this.snackBar.open('Login Successful', 'OK', {duration: 2000});
          localStorage.setItem('access_token',res);
          this.apiService.userStatus.next('loggedIn');
        }
      }
    })
  }
};
