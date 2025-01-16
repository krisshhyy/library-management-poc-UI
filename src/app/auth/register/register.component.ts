import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.registerForm = fb.group({
      firstname: fb.control(''),
      lastname: fb.control(''),
      email: fb.control(''),
      mobile: fb.control(''),
      password: fb.control(''),
      rpassword: fb.control('')
    })
  }

}
