import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {
 
  }
  
  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    }).present();
  }
  showToastBack(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}
