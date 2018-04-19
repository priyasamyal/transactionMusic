import {BrowserModule} from '@angular/platform-browser';

import {ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Network} from '@ionic-native/network';
import {IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ToastProvider} from '../providers/toast/toast';
import {ApiProvider} from '../providers/api/api';
import {CommonProvider} from '../providers/common/common';
import {PayPal, PayPalPayment, PayPalConfiguration} from '@ionic-native/paypal';
import {MusicControls} from '@ionic-native/music-controls';
//import {Media, MediaObject} from '@ionic-native/media';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmailComposer} from '@ionic-native/email-composer';
@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,

    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    Network,
    PayPal,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastProvider,
    ApiProvider,
    CommonProvider,
    PayPal,
    MusicControls,
    EmailComposer,
    //Media,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
