import {Component, ViewChild} from '@angular/core';
import {
  Platform,
  Nav,
  App,
  MenuController,
  ViewController,
} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {CommonProvider} from '../providers/common/common';
import {ToastProvider} from '../providers/toast/toast';

export interface PageInterface {
  title: string;
  name: string;
  icon: string;
}

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(ViewController) viewCtrl: ViewController;
  // rootPage: any = 'FaqPage';
  rootPage: any;
  menuPages: PageInterface[] = [
    {title: 'HOME', name: 'HomePage', icon: 'assets/imgs/home.png'},
    {title: 'PLAY ALL', name: 'PlayAllPage', icon: 'assets/imgs/play.png'},
    {title: 'CHECKOUT', name: 'CheckoutPage', icon: 'assets/imgs/checkout.png'},
    {
      title: 'CONTACT US',
      name: 'ContactUsPage',
      icon: 'assets/imgs/contact-us.png',
    },
    {
      title: 'FAQS',
      name: 'FaqPage',
      icon: 'assets/imgs/faq.png',
    },
    // { title: 'PayPAl Demo', name: 'PaypalPage',   icon: 'assets/imgs/contact-us.png' },
  ];
  constructor(
    public common: CommonProvider,
    private toast: ToastProvider,
    public menu: MenuController,
    public app: App,
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      var lastTimeBackPress = 0;
      var timePeriodToExist = 2000;
      this.common.get_all_category().subscribe(
        res => {
          this.rootPage = HomePage;
          splashScreen.hide();
        },
        err => {
          this.rootPage = HomePage;
          splashScreen.hide();
        }
      );
      //  splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        console.log('Back Button Pressed', this.app.getActiveNav().getViews());
        let view = this.app.getActiveNav().getViews().length;
        if (view == 1) {
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExist) {
            this.platform.exitApp();
            if (this.menu.isOpen()) this.menu.close();
            else if (this.nav.canGoBack()) this.nav.pop({});
          } else {
            this.toast.showToastBack('Press back again to exit App?');
            lastTimeBackPress = new Date().getTime();
          }
        } else if (view != 1) {
          let nav = app.getActiveNav();
          let activeView: ViewController = nav.getActive();
          console.log(activeView);
          if (activeView != null) {
            if (nav.canGoBack()) nav.pop();
            else nav.parent.select(0); // goes to the first tab
          }
        }
      });
    });
  }
  openPage(page: PageInterface) {
    if (page.name == 'HomePage') {
      this.nav.setRoot(HomePage);
    } else this.nav.push(page.name);
  }
}
