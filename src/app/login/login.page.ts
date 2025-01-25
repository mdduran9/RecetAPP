import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import {Router} from '@angular/router'; //IMPORTAMOS EL ROUTER

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,  
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage,
    private router:Router
  ){
    this.loginForm = this.formBuilder.group({
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

  loginuser (credentials: any){
    this.errorMessage = ''; // Limpia cualquier mensaje de error previo
    this.authService.loginuser( credentials ).then((res:any) => {
      console.log(res);
      this.errorMessage = 'El correo o la contraseña son incorrectos.';
      this.storage.set ('user', res.user);
      this.storage.set ('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/intro');
    }).catch(err =>{
      this.errorMessage = err;
    });
  }

  finish(){
    this.router.navigateByUrl('/register');
  }
}
