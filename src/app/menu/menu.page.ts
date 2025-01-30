import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  )
  { }
  
  ngOnInit() {
  }

  closeMenu(){
    this.menuCtrl.close(); // Cierra el menú activo
  }

  logout(){
    this.storage.remove("isUserLoggedIn");
    this.navCtrl.navigateRoot("/login"); // Ir a Login
  }

  account(){
    this.navCtrl.navigateRoot("/account"); // Ir al Perfil
  }

  inicio(){
    this.navCtrl.navigateRoot("/home"); // Ir al Inicio
  }

  search_user(){
    this.navCtrl.navigateRoot("/search-users"); // Busqueda de usuario
  }
}
