import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlServer= 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private http: HttpClient
  ) { }

  getUser(id: any){
    return new Promise ((accept, reject)=> {
      const options = { headers: this.httpHeaders };
      this.http.get(`${this.urlServer}/current_user/${id}`, options).subscribe(
        (data: any) =>{
          console.log(data, 'data');
          accept(data);
        },
        (error)=>{
          console.log(error);
          if (error.status==422){
            reject('');
          } else if (error.status==500){
              reject('Error por favor intente mas tarde');
          }else{
              reject('Error al cargar al usuario');
          }
        }
      )
    });
  }

  //Funcionalidad para actualizar datos de perfil
  updateUser(user : any){
    const user_params = {
      user:user
    }
    return new Promise ((accept, reject)=> {
      const options = { headers: this.httpHeaders };
      this.http.post(`${this.urlServer}/update/${user.id}`,user_params, options).subscribe(
        (data: any) =>{
          console.log(data, 'data');
          accept(data);
        },
        (error)=>{
          console.log(error);
          if (error.status==422){
            reject('');
          } else if (error.status==500){
              reject('Error por favor intente mas tarde');
          }else{
              reject('Error al actualizar al usuario');
          }
        }
      )
    });

  }

  //Funcionalidad para buscar otros usuarios
  listUsers(page: number, perPage: number, query: string = ''){
    const url = `${this.urlServer}/list_users?page=${page}&per_page=${perPage}&query=${query}`;
    return this.http.get(url).toPromise();
  }

  //Funcionalidad para seguir usuario
  followUser(user_id: any, followee_id: any){
    const follow_params = {
      followee_id: followee_id
    }
    return new Promise((accept, reject) => {
      const options = { headers: this.httpHeaders };
      this.http.post(`${this.urlServer}/follow/${user_id}`, follow_params, options).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error) => {
          console.log(error, 'error');
           if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al seguir al usuario');
          }
        }
      )
    });
  }
  //Funcionalidad para dejar de seguir al usuario

  unfollowUser(user_id: any,  followee_id: any){
    const unfollow_params = {
      followee_id: followee_id
    }
    return new Promise((accept, reject) => {
      const options = { headers: this.httpHeaders };
      this.http.post(`${this.urlServer}/unfollow/${user_id}`, unfollow_params, options).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error) => {
          console.log(error, 'error');
           if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al seguir al usuario');
          }
        }
      )
    });
  }
}
