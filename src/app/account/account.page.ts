import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements} from '@ionic/pwa-elements/loader';
import { UpdateUserModalPage } from '../update-user-modal/update-user-modal.page';
import { AlertController } from '@ionic/angular';

defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any={
    name:'',
    email:'',
    image:'', 
    followees: [],
    followers: []
  };
  constructor(
    private userService: UserService,
    private storage: Storage,
    private modalController: ModalController,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user,'Usuario');
    this.userService.getUser(user.id).then(
      (data:any)=>{
      console.log(data);
      this.storage.set('user',data); //Se actualizan los datos cada vez que se entre a la pagina de la cuenta
      this.user_data = data;
    },
    ).catch(err =>{
      console.log('Error');
    });
  }

  async takePhoto(source: CameraSource) {
    console.log('Tomando foto...');
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });

   console.log('Foto capturada:', capturePhoto.dataUrl);
    this.user_data.image = capturePhoto.dataUrl;
    this.update();
  }

  async update(){
    this.userService.updateUser(this.user_data).then(
      (data:any)=>{
      console.log(data);
    },
    ).catch(error =>{
      console.log(error);
    });
  }
  async updatePerfil(){
    console.log('Editar perfil');
    const modal = await this.modalController.create({
      component: UpdateUserModalPage,
      componentProps:{}
    });
    return await modal.present();
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons:[
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }
  
}