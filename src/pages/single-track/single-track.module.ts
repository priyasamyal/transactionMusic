import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SingleTrackPage} from './single-track';
import {
  IonicAudioModule,
  WebAudioProvider,
  CordovaMediaProvider,
  defaultAudioProviderFactory,
} from 'ionic-audio';

export function myCustomAudioProviderFactory() {
  return window.hasOwnProperty('cordova')
    ? new CordovaMediaProvider()
    : new WebAudioProvider();
}
@NgModule({
  declarations: [SingleTrackPage],
  imports: [
    IonicPageModule.forChild(SingleTrackPage),
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
  ],
  exports: [SingleTrackPage],
})
export class SingleTrackPageModule {}
