import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; //IMPORTAMOS EL CUSTOM_ELEMENTS_SCHEMA PARA QUE NO NOS DE ERROR EN EL HTML

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule
  ],
  declarations: [AccountPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //AÑADIMOS EL CUSTOM_ELEMENTS_SCHEMA
})
export class AccountPageModule {}
