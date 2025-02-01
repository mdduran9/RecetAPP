import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements} from '@ionic/pwa-elements/loader';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController, AlertController, NavController} from '@ionic/angular';
import { UserService } from '../services/user.service';
defineCustomElements(window);

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone : false
})
export class AddPostModalPage implements OnInit {
  post_image:any;
  addPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController,
    private navCtrl: NavController
  ){
    this.addPostForm = this.formBuilder.group({
      description : new FormControl('',Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async uploadPhone(){
    console.log('Upload Photo');
    const uploadPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality:100
    });
    if (uploadPhoto.dataUrl) {
      this.post_image = uploadPhoto.dataUrl; // Asigna la imagen
      this.addPostForm.patchValue({
        image: this.post_image // Guarda en el formulario
      });
    } else {
      console.error('No se pudo cargar la imagen');
    }
  }

  async addPost(post_data:any){
    console.log('Add Post - Datos recibidos:', post_data);
    if (this.addPostForm.invalid) {
      console.log('Formulario inválido');
      return; // Evita enviar si el formulario no es válido
    }
    const user= await this.storage.get('user');
    const post_params = {
      post: {
        description: post_data.description,
        image: post_data.image,
        user_id: user.id
      }
      
    };
    console.log(post_params,'post para enviar');
    this.postService.createPosts(post_params).then(
      (data:any)=>{
        console.log(data,'post creado');
        data.user = {
          id: user.id,
          name: user.name,
          image: user.image || 'assets/imgs/perfil.png'
        };
        this.postService.postCreated.emit(data);
        this.addPostForm.reset();
        this.post_image = null;
        this.modalController.dismiss(); 
      },
      (error) => {
        console.log('Error en la creación del post:', error)
      }
    )
  }

  goBack() {
    console.log('Regresa');
    this.modalController.dismiss();  // Cierra el modal
    this.navCtrl.navigateRoot('menu/home');  // Navega hacia la cuenta
    console.log('');
  }
}
