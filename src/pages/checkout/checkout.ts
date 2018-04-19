import {Component, ChangeDetectorRef} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {Events} from 'ionic-angular';
import {PayPal, PayPalPayment, PayPalConfiguration} from '@ionic-native/paypal';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.04BAE9
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  finalPrice: number = 0;
  cartItem = [];
  payment_array: Object[] = [];
  constructor(
    private payPal: PayPal,
    public events: Events,
    public common: CommonProvider,
    private _cdRef: ChangeDetectorRef,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    private alertCtrl: AlertController
  ) {
    this.events.subscribe('cart_get', (cart, time) => {
      console.log('Welcome', cart, 'at', time);
      this.getCartArray(cart);
    });
    this.payment_array['_token'] = 'Yteu5CRaHksslNzg53jj6mtkFIeW4ClZ1FeZ0yRe';
    this.payment_array['return_url'] = true;
  }

  ionViewDidLoad() {
    this.common.getItem('my_cart');
    console.log('ionViewDidLoad CheckoutPage');
  }
  ionViewWillEnter() {
    // this.common.getItem('my_cart');
    // console.log('ionViewDidLoad CheckoutPage');
    // console.log('will nter');
  }

  getCartArray(cart) {
    let checkout_data = [];

    if (cart != null) {
      console.log(cart, 'res');
      let tempArray = [];
      tempArray = cart;

      for (let i in tempArray) {
        var price = 0;
        let file_type = [];
        for (let j in tempArray[i].files) {
          price = parseFloat((tempArray[i].files[j].price + price).toFixed(2));
          file_type.push(tempArray[i].files[j].type);
        }
        tempArray[i].final_price = price;
        this.finalPrice += tempArray[i].final_price;
        checkout_data.push({
          beat_id: tempArray[i].beat_id,
          paypal_email: tempArray[i].paypal_email,
          file_type: file_type,
          finalPrice: tempArray[i].final_price,
        });
      }
      this.cartItem = tempArray;
    }
    // console.log( this.finalPrice, "console.log(this. this.finalPrice);");
    // console.log(this.cartItem, "console.log(this.cartItem);");
    this.payment_array['data'] = checkout_data;
    console.log(this.payment_array, 'payment');
  }
  delete(item, index) {
    console.log(index);
    this.cartItem.splice(index, 1);
    this.finalPrice = 0;
    this.cartItem.map(m => {
      console.log(m);
      this.finalPrice += m.final_price;
    });
    console.log(this.cartItem, ' this.cartItem deleter after');
  }

  goToCheckOut() {
    this.makePayment();
  }
  goToCart() {
    this.navCtrl.push('MycartPage');
  }
  onSearch() {
    this.navCtrl.push('SearchPage');
  }
  presentPrompt() {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let alert = this.alertCtrl.create({
      title: 'Enter your email to receive the beats',
      inputs: [
        {
          name: 'email',
          placeholder: 'E-mail',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Proceed',
          handler: data => {
            console.log(data, 'data');
            if (EMAIL_REGEXP.test(data.email)) {
              console.log('valid tempty');
              this.payment_array['email'] = data.email;
              this.makePayment();
              //this.orderComplete();
            } else {
              this.toast.showToast('Enter valid email address');
              return false;
            }
          },
        },
      ],
    });
    alert.present();
  }
  makePayment() {
    console.log(this.payment_array, 'this.payment_array');
    this.payPal
      .init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox:
          'ATOQp9Nup9kNXpU-rU_EKbBnV95jIMf1SWMuENFOpcNKv7UFeq5WkeXfqYcGpVlfXLUHRQ_swWZjmplj',
      })
      .then(
        () => {
          this.payPal
            .prepareToRender(
              'PayPalEnvironmentSandbox',
              new PayPalConfiguration({})
            )
            .then(
              () => {
                let amount = this.finalPrice.toString();
                // let amount = '2';
                let payment = new PayPalPayment(
                  amount,
                  'USD',
                  'Description',
                  'sale'
                );
                this.payPal.renderSinglePaymentUI(payment).then(
                  () => {
                    console.log(payment, 'payment sucess');
                    this.toast.showToast('Payment made sucessfully');
                    this.orderComplete();
                  },
                  err => {
                    this.toast.showToast('Error while making payment');
                    console.log(
                      'Error or render dialog closed without being successful',
                      err
                    );
                  }
                );
              },
              config_err => {
                console.log(config_err, 'config error');
              }
            );
        },
        () => {
          console.log(
            "Error in initialization, maybe PayPal isn't supported or something else"
          );
        }
      );
  }

  orderComplete() {
    console.log(this.payment_array, 'this.payment_array');
    this.common.payment(this.payment_array).subscribe(
      data => {
        console.log(data, 'data response', data.user_email);
        this.navCtrl.push('AfterCheckoutPage', {
          my_order: this.cartItem,
          price: this.finalPrice,
          email: data.user_email,
        });
        this.common.removeItem('my_cart');
      },
      err => {
        console.log('error');
        this.toast.showToast('Error occur while purchasing beat');
      }
    );
  }
}
