import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; //IMPORTAMOS EL ROUTER
import { Storage } from '@ionic/storage-angular'; // importamos el Storage
 
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone:false,
})
export class IntroPage implements OnInit {

  constructor(
    private router:Router,
    private storage:Storage //INYECTAMOS EL ROUTER y storage
  ) { } 

  ngOnInit() {
  }
  finish(){
    console.log('Finish');
    this.storage.set('viLaIntro',true); //guardamos en el storage que ya se ha mostrado la instroduccion
    this.router.navigateByUrl('/home');
  }
}