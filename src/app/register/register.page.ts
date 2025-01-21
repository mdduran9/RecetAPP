import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message:'El correo es obligatorio'},
      { type: 'email', message:'El correo no es valido'}
    ],
    password: [
      { type: 'required', message:'La contraseña es obligatoria'},
      { type: 'password', message:'La contraseña es de minimo 6 caracteres'}
    ]
  }

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.registerForm= this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    })
  }

  ngOnInit() {
  }

}
