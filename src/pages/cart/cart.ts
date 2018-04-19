import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItem=[];
  
  finalPrice:number=0;
  constructor(public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  ionViewWillEnter(){
    this.finalPrice=9;
  //   this.common.getItem('my_cart').then(val=>{
  //     console.log(val,"res");
  //     let tempArray=[]
  //     tempArray=val;
  //      for(let i in tempArray){
  //        var price =0;
  //              for(let j in tempArray[i].files){
  //                price=parseFloat((tempArray[i].files[j].price + price).toFixed(2));
  //             }
  //              tempArray[i].final_price=price;
  //           this.finalPrice+=tempArray[i].final_price;
  //      }
  //      this.cartItem=tempArray;
  //      this.finalProcePrint = this.finalPrice;
  //      console.log( this.finalPrice, "console.log(this. this.finalPrice);");
  //      console.log(this.cartItem, "console.log(this.cartItem);");
       
  //  })
  }
  
  goToCheckOut(){
    this.navCtrl.push("CheckoutPage");
  }

}
