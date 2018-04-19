import {Component, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {Events} from 'ionic-angular';
/**
 * Generated class for the MycartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MycartPage {
  finalPrice: number = 0;
  cartItem = [];
  constructor(
    public events: Events,
    public common: CommonProvider,
    private _cdRef: ChangeDetectorRef,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.events.subscribe('cart_get', (cart, time) => {
      console.log('Welcome', cart, 'at', time);
      this.getCartArray(cart);
    });
  }

  ionViewDidLoad() {
    this.common.getItem('my_cart');
    console.log('ionViewWillENter MycartPage');
  }
  getCartArray(cart) {
    if (cart != null) {
      console.log(cart, 'res');
      let tempArray = [];
      tempArray = cart;
      for (let i in tempArray) {
        var price = 0;
        for (let j in tempArray[i].files) {
          price = parseFloat((tempArray[i].files[j].price + price).toFixed(2));
        }
        tempArray[i].final_price = price;
        this.finalPrice += tempArray[i].final_price;
      }
      this.cartItem = tempArray;
      console.log(this.finalPrice, 'console.log(this. this.finalPrice);');
      console.log(this.cartItem, 'console.log(this.cartItem);');
      // this._cdRef.detectChanges();
    }
  }
  delete(item, index) {
    console.log(index);
    this.cartItem.splice(index, 1);
    this.finalPrice = 0;
    this.cartItem.map(m => {
      console.log(m);
      this.finalPrice += m.final_price;
    });
    if (this.cartItem.length == 0) {
      this.common.setCartItem('my_cart', null);
    } else {
      this.common.setCartItem('my_cart', this.cartItem);
    }
    console.log(this.cartItem, ' this.cartItem deleter after');
  }

  goToCheckOut() {
    this.navCtrl.push('CheckoutPage');
  }
  onSearch() {
    this.navCtrl.push('SearchPage');
  }
}
