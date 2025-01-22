import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


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
    name: [
      { type: 'required', message:'El nombre es obligatorio'}
    ],
    lastname: [
      { type: 'required', message:'El apellido es obligatorio'}
    ],
    email: [
      { type: 'required', message:'El correo es obligatorio'},
      { type: 'email', message:'El correo no es valido'}
    ],
    username: [
      { type: 'required', message:'El nombre de usuario es obligatorio'}
    ],
    password: [
      { type: 'required', message:'La contraseña es obligatoria'},
      { type: 'password', message:'La contraseña es de minimo 6 caracteres'},
      { type: 'pattern', message:'La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y sin caracteres especiales.'}
    ],
    confirm_password: [
      { type: 'required', message:'La confirmación de contraseña es obligatoria'},
      { type: 'mismatch', message:'La contraseña no coinciden'}
    ]
  }

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.registerForm= this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') // La contraseña debe contener al menos una mayúscula, un número, sin caracter especial
      ])),
      confirm_password: new FormControl('', Validators.required) 
    },{ 
      validators: this.passwordsMatchValidator // Validación directamente en el grupo
    });
  }

   // Validación de contraseñas directamente en el grupo
   passwordsMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirm_password')?.setErrors(null);
    }
  }
  ngOnInit() {
  }

  registerUser (registerData:any){
    console.log(registerData, "Datos del registro")
  }

}
