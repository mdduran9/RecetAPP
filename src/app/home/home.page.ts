import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';
import { __awaiter } from 'tslib';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any[] = [];
  page: number =1;
  limit: number = 10;
  hasMore: boolean = true;
  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) {}

  ngOnInit(){
    console.log('Init Home');
    this.loadPost();
  }

  async addPost(){
    console.log('Add Post');
    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps:{}
    });
    return await modal.present();
  }
  
  loadPost(event?: any){
    console.log('Cargando más publicaciones...');
    this.postService.getPosts(this.page, this.limit).then(
      (data: any)=>{
        console.log('Nuevas publicaciones:');
        if (data.length > 0){ 
          this.posts = [...this.posts, ...data];
          this.page++;
        }else{
          console.log('No hay más publicaciones disponibles.');
          this.hasMore = false;
        }
        if (event) {
          event.target.complete();
        }
      },
      (error)=>{
        console.log(error);
        if (event){
          event.target.complete();
          this.hasMore = false;
        }
      }
    )
  }
}
