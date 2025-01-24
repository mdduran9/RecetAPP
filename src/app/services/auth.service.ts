import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlServer= 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private http: HttpClient
  ) { }

  loginuser(credentials: any) {
    return new Promise((accept, reject) => {
      let params= {
        "user": { ...credentials }
      }
      this.http.post(`${this.urlServer}/login`,params,{headers: this.httpHeaders}).subscribe(
        (data: any) =>{
          if (data.status == 'OK'){
            accept(data);
          }else{
            reject(data);
          }
        },
        (error)=>{
          console.log(error);
          if (error.status==422){
            reject('Usuario o contraseña incorrectos');
          } else if (error.status==500){
              reject('Error por favor intente mas tarde');
          }else{
              reject('Error al intenter iniciar sesion');
          }
        }
      )
    });
  }

  register (data: any){
    return new Promise ((accept, reject)=> {
      let params = {
        "user":{
          "email": data.email,
          "password": data.password,
          "confirm_password": data.confirm_password,
          "name": data.name,
          "lastname": data.lastname,
          "username": data.username
        }
      }
      this.http.post(`${this.urlServer}/signup`,params,{headers: this.httpHeaders}).subscribe(
        (data: any) =>{
          if (data.status == 'OK'){
            accept(data);
          }else{
            reject(data);
          }
        },
        (error)=>{
          console.log(error);
          if (error.status==422){
            reject('Usuario o contraseña incorrectos');
          } else if (error.status==500){
              reject('Error por favor intente mas tarde');
          }else{
              reject('Error al intenter iniciar sesion');
          }
        }
      )

    });
  }
}
