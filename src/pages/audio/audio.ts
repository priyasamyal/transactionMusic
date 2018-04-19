import {Component, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ITrackConstraint} from 'ionic-audio';
import {MusicControls} from '@ionic-native/music-controls';
/**
 * Generated class for the AudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
})
export class AudioPage {
  myTracks: ITrackConstraint[];
  playlist: ITrackConstraint[] = [];

  currentIndex: number = -1;
  currentTrack: ITrackConstraint;

  constructor(
    private musicControls: MusicControls,
    private _cdRef: ChangeDetectorRef,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.myTracks = [
      {
        src:
          'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
        artist: 'John Mayer',
        title: 'Why Georgia',
        art: 'assets/imgs/10.png',
        preload: 'metadata', // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      },
      {
        src:
          'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
        artist: 'John Mayer',
        title: 'Who Says',
        art: 'assets/imgs/9.png',
        preload: 'metadata', // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
      },

      {
        src:
          'https://archive.org/download/swrembel2010-03-07.tlm170.flac16/swrembel2010-03-07s1t05.mp3',
        artist: 'Stephane Wrembel',
        title: 'Stephane Wrembel Live',
        art: 'assets/imgs/13.png',
        preload: 'metadata', // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
      },
    ];

    this.sub();
    //     this.musicControls.listen(); // activates the observable above

    //  this.musicControls.updateIsPlaying(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioPage');
  }
  add(track: ITrackConstraint) {
    this.playlist.push(track);
  }

  play(track: ITrackConstraint, index: number) {
    this.currentTrack = track;
    this.currentIndex = index;
  }

  next() {
    // if there is a next track on the list play it
    if (
      this.playlist.length > 0 &&
      this.currentIndex >= 0 &&
      this.currentIndex < this.playlist.length - 1
    ) {
      let i = this.currentIndex + 1;
      let track = this.playlist[i];
      this.play(track, i);
      this._cdRef.detectChanges(); // needed to ensure UI update
    } else if (this.currentIndex == -1 && this.playlist.length > 0) {
      // if no track is playing then start with the first track on the list
      this.play(this.playlist[0], 0);
    }
  }

  onTrackFinished(track: any) {
    this.next();
  }

  clear() {
    this.playlist = [];
  }

  sub() {
    this.musicControls.create({
      track: 'Time is Running Out', // optional, default : ''
      artist: 'Muse', // optional, default : ''
      cover: 'https://dummyimage.com/600x400/000/fff', // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: true, // optional, default : true
      dismissable: true, // optional, default : false

      // hide previous/next/close buttons:
      hasPrev: false, // show previous button, optional, default: true
      hasNext: false, // show next button, optional, default: true
      hasClose: true, // show close button, optional, default: false

      // iOS only, optional
      album: 'Absolution', // optional, default: ''
      duration: 60, // optional, default: 0
      elapsed: 10, // optional, default: 0
      hasSkipForward: true, // show skip forward button, optional, default: false
      hasSkipBackward: true, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker: 'Now playing "Time is Running Out"',
      // All icons default to their built-in android equivalents
      // The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification',
    });
    this.musicControls.subscribe().subscribe(action => {
      alert('hi');
      
        console.log('action', action);
        const message = JSON.parse(action).message;
        console.log(message,"message")
        switch (message) {
          case 'music-controls-pause':
            console.log('musc pause'); // not work
           
            break;
          case 'music-controls-play':
            console.log('music play'); // not work
          case 'music-controls-destroy':
            // Do something
            break;

          default:
            break;
        }
      
    });
    this.musicControls.listen(); // activates the observable above
    this.musicControls.updateIsPlaying(true);
  }
}
