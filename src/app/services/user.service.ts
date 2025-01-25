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
}
