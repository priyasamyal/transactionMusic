import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {ToastProvider} from '../../providers/toast/toast';
import {EmailComposer} from '@ionic-native/email-composer';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  contact_data = {
    name: '',
    email: '',
    message: '',
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public common: CommonProvider,
    public toast: ToastProvider,
    private emailComposer: EmailComposer
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  contact() {
    console.log('contac', this.contact_data);
    if (this.contact_data.name == '') {
      this.toast.showToast('Enter your name');
    } else if (this.contact_data.email == '') {
      this.toast.showToast('Enter your email');
    } else if (this.contact_data.message == '') {
      this.toast.showToast('Enter your message');
    } else {
      console.log('all god');
      this.emailComposer.isAvailable().then((available: boolean) => {
        if (available) {
          //Now we know we can send
        }
      });

      let email = {
        to: 'info@transactionmusic.com',
        // cc: 'erika@mustermann.de',
        // bcc: ['john@doe.com', 'jane@doe.com'],
        subject: 'Transaction Music Contact Us',
        body:
          this.contact_data.message +
          '<br> Thanks & Regards <br> Name:' +
          this.contact_data.name +
          '<br> Email:' +
          this.contact_data.email,
        isHtml: true,
      };

      // Send a text message using default options
      this.emailComposer.open(email);
    }
  }
  onSearch() {
    this.navCtrl.push('SearchPage');
  }
  goToCart() {
    this.navCtrl.push('MycartPage');
  }
}
