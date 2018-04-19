import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController ,NavParams } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
/**
 * Generated class for the ProducerLandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producer-landing',
  templateUrl: 'producer-landing.html',
})
export class ProducerLandingPage {

  constructor( private viewCtrl: ViewController,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProducerLandingPage');
  }
  onSearch(){
    this.navCtrl.push("SearchPage");
  }
  goToCart(){
    this.navCtrl.push("CartPage");
  }
  goToSingleTrackPage(cat){
    //this.navCtrl.setRoot("SingleTrackPage")
  }


}
