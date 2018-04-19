import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProducerLandingPage } from './producer-landing';

@NgModule({
  declarations: [
    ProducerLandingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProducerLandingPage),
  ],
  exports:[ProducerLandingPage]
})
export class ProducerLandingPageModule {}
