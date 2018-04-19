import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AfterCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-checkout',
  templateUrl: 'after-checkout.html',
})
export class AfterCheckoutPage {
  my_order = [];
  total_price = 0;
  email: string = 'myemail@gmail.com';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('my_order'));
    this.my_order = this.navParams.get('my_order');
    this.total_price = this.navParams.get('price');
    this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AfterCheckoutPage');
  }
  onSearch() {
    this.navCtrl.push('SearchPage');
  }
  goToCart() {
    this.navCtrl.push('MycartPage');
  }
}
