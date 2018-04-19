import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaySearchPage } from './play-search';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

@NgModule({
  declarations: [
    PlaySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaySearchPage),
    IonicAudioModule.forRoot(defaultAudioProviderFactory), 
  ],
  exports:[PlaySearchPage]
})
export class PlaySearchPageModule {}
