import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements} from '@ionic/pwa-elements/loader';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { last } from 'rxjs';
defineCustomElements(window);
@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.page.html',
  styleUrls: ['./update-user-modal.page.scss'],
  standalone : false
})
export class UpdateUserModalPage implements OnInit {
  post_image:any;
  updatePostForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController
  ) { 
    this.updatePostForm = this.formBuilder.group({
      name : new FormControl('',Validators.required),
      lastname: new FormControl('', Validators.required),
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
      this.updatePostForm.patchValue({
        image: this.post_image // Guarda en el formulario
      });
    } else {
      console.error('No se pudo cargar la imagen');
    }
  }

  async updateUser(post_data:any){
    console.log('Datos actualizado', post_data);
    if (this.updatePostForm.invalid) {
      console.log('Formulario inválido');
      return; // Evita enviar si el formulario no es válido
    }
    const user= await this.storage.get('user');
    const post_params = {
      post: {
        name: post_data.name,
        lastname: post_data.lastname,
        image: post_data.image,
        user_id: user.id
      }
      
    }
  }
}
