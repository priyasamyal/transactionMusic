import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycartPage } from './mycart';

@NgModule({
  declarations: [
    MycartPage,
  ],
  imports: [
    IonicPageModule.forChild(MycartPage),
  ],
  exports:[MycartPage]
})
export class MycartPageModule {}
