import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioPage } from './audio';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}
@NgModule({
  declarations: [
    AudioPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioPage),
    IonicAudioModule.forRoot(defaultAudioProviderFactory), 
  ],
  exports:[AudioPage]
})
export class AudioPageModule {}
