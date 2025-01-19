import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: any) {
    console.log(credentials, "desde el servicio");
    return new Promise((accept, reject) => {
      // Validación del email
      if (credentials.email === 'moises@gmail.com') {
        // Validación de la contraseña
        if (credentials.password === '$Moises91') {
          accept('Login correcto');
        } else {
          reject('Contraseña incorrecta');
        }
      } else {
        reject('Email incorrecto');
      }
    });
  }
}
