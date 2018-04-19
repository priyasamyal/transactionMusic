import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayAllPage } from './play-all';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

@NgModule({
  declarations: [
    PlayAllPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayAllPage),
    IonicAudioModule.forRoot(defaultAudioProviderFactory), 
  ],
})
export class PlayAllPageModule {}
