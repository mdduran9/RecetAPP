import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlServer= 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private http: HttpClient 
  ) { }

  getPosts(page:number, perPage:number){
    return new Promise ((accept, reject)=> {
      const options = { headers: this.httpHeaders };
      this.http.get(`${this.urlServer}/posts?page=${page}&per_page=${perPage}`, options).subscribe(
        (data: any) =>{
          console.log(data, 'data');
          accept(data);
        },
        (error)=>{
          console.log(error);
          if (error.status==422){
            reject('Parámetros incorrectos para obtener los posts.');
          } else if (error.status==500){
            reject('Error del servidor. Intenta de nuevo más tarde.');
          }else{
            reject('Error desconocido al intentar obtener los posts.');
          }
        }
      )
    });
  }

      createPosts(post_data: any){
        return new Promise ((accept, reject)=> {
          const options = { headers: this.httpHeaders };
          this.http.post(`${this.urlServer}/posts`, post_data, options).subscribe(
            (data: any) =>{
              console.log(data, 'data');
              accept(data);
            },
            (error)=>{
              console.log(error);
              if (error.status==422){
                reject('Faltan campos por diligenciar para crear Post');
              } else if (error.status==500){
                  reject('Error por favor intente mas tarde');
              }else{
                  reject('Error al crear al Post');
              }
            }
          )
        });
      }
}
