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
        console.log(res);
      }
    })
  }
};
