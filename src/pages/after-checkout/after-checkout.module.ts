import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AfterCheckoutPage } from './after-checkout';

@NgModule({
  declarations: [
    AfterCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(AfterCheckoutPage),
  ],
  exports:[AfterCheckoutPage]
})
export class AfterCheckoutPageModule {}
