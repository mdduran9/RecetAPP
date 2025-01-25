import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any={
    name:'',
    last_name:'',
    email:'',
    image:'', 
    username:'',
    followed_users:[],
    following_users:[]
  };
  constructor(
    private userService: UserService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user,'Usuario');
    this.userService.getUser(user.id).then(
      (data:any)=>{
      console.log('data');
      this.storage.set('user',data); //Se actualizan los datos cada vez que se entre a la pagina de la cuenta
      this.user_data = data;
    },
    ).catch(err =>{
      console.log('Error');
    });
  }

}