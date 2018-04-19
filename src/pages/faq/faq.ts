import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  faq_list = [
    {
      ques: 'What is Transactionmusic.com?',
      ans:
        'TransactionMusic.com is a Global Beat Marketplace where producers can lease their own Instance and sell their own beats via their independent TransactionMusic Instance as well as in the Global TransactionMusic.com Beat Marketplace. TransactionMusic.com' +
        'allows artists and people looking for beats the ability to listen and purchase beats from participating producers globally!',
      is_hide: true,
    },
    {
      ques: 'Can I download a song I produced with lyrical content?',
      ans:
        'No, TransactionMusic.com does not allow full songs to be uploaded onto the site. Read our Terms and Policies. If a beat comes with a sample as lyrical content then thats fine but we do not condone the use of any illegal content. At the moment, we only entertain the selling of beats on the platform.',
      is_hide: true,
    },
    {
      ques:
        'How much Upload space do I have as an TransactionMusic.com Instance Owner?',
      ans:
        'Every Instance owner starts of at 2GB of storage. The goal is to put quality content into your TransactionMusic.com Instance and not just use it for storage. Upon reaching the 2GB storage threshold the Instance owner will be provided an opportunity to expand their storage.',
      is_hide: true,
    },
    {
      ques: 'Where  do I go to upload  a beat?',
      ans:
        'You have to be an Instance owner to upload a beat! Within your Instance admin panel you will see in the menu "Beats".',
      is_hide: true,
    },
    {
      ques: 'Is there a cost to listen to beats?',
      ans:
        'There is no cost to listen to beats. Enjoy yourself, get inspired by the many types of beats available in our Global TransactionMusic Marketplace or on any particular Instance Owners page for that matter.',
      is_hide: true,
    },

    {
      ques: 'Is there a cost to add beats?',
      ans:
        'No cost to add beats. As a TransactionMusic.com Instance Owner you have already paid the one time setup fee and first year. TransactionMusic.com does not charge to post beats. We charge for the lease of the actual Instance itself.',
      is_hide: true,
    },
    {
      ques: 'What is the cost of a beat?',
      ans:
        'It is up to the TransactionMusic.com Instance Owner what they want to charge for their beats. Some people will sell beasts for .99 and others may sell a beat for $1,000.00. The price for a beat is at the discretion of the seller. TransactionMusic.com will receive a 10% commission per beat sold on the site, this 10% is non-negotiable and will be deducted at the time of the transaction checkout.',
      is_hide: true,
    },
    {
      ques: 'Are there any refunds?',
      ans:
        'TransactionMusic.com the company offers ZERO refunds for the lease of our Instance. If you do not want to renew for the next year contact us or disable your store from your Instance Owner admin panel.',
      is_hide: true,
    },
    {
      ques:
        'Is there a limit to how many producers us a unique instance of TransactionMusic?',
      ans:
        'TransactionMusic.com provides each Instance Owner with their own Username and Password. The Instance Owner can place as many producer label mates as the wish within their instance. Thus, you can promote your producer label mates on your Instance as well and sell their beats as one team!',
      is_hide: true,
    },
    {
      ques: 'What is the difference between Exclusive and Non-exclusive Beats?',
      ans:
        'Exclusive beats when sold for the first time comes off the marketplace. The Seller of that beat has created the terms that the purchased beat is exclusive ownership to the purchaser. So if you purchase an exclusive beat and find out someone else is using the same beat, contact that producer directly. That is why there are contracts!',
      is_hide: true,
    },
    {
      ques: 'What is the method of payment used:',
      ans:
        'Paypal is the only method of payment used at this time on TransactionMusic.com',
      is_hide: true,
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

  ques_click(item) {
    console.log(item);

    item.is_hide = !item.is_hide;
  }
}
