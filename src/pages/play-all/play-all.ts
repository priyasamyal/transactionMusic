import {Component, ChangeDetectorRef, ViewChild} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {CommonProvider} from '../../providers/common/common';
import {ToastProvider} from '../../providers/toast/toast';
import {ITrackConstraint} from 'ionic-audio';
import {MusicControls} from '@ionic-native/music-controls';
/**
 * Generated class for the PlayAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-all',
  templateUrl: 'play-all.html',
})
export class PlayAllPage {
  @ViewChild('audioTrack') audioTrack;
  my_track: any;
  all_tracks: any;
  beat_files = [];
  myTracks: ITrackConstraint[];
  playlist: ITrackConstraint[] = [];
  currentIndex: number = -1;
  currentTrack: ITrackConstraint;
  is_pause: boolean = true;

  selected_track = {};
  cart_array = [];
  file_type = [];
  storedCart = [];

  active_list: any;
  constructor(
    public toast: ToastProvider,
    private storage: Storage,
    public common: CommonProvider,
    private _cdRef: ChangeDetectorRef,
    public navCtrl: NavController,
    public navParams: NavParams,
    private musicControls: MusicControls
  ) {
    console.log(this.selected_track['art'], 'hh');
    this.getAllSongs();
  }
  ionViewWillLeave() {
    if (this.audioTrack._audioTrack != undefined) {
      this.musicControls.updateIsPlaying(false);
      this.is_pause = true;
      this.audioTrack._audioTrack.pause();
      console.log(this.audioTrack._audioTrack, 'audioTrack');
    } else {
      console.log(this.audioTrack._audioTrack, 'audioTrack  undefined');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayAllPage');
  }
  onSearch() {
    this.navCtrl.push('SearchPage');
  }
  goToCart() {
    this.navCtrl.push('MycartPage');
  }
  AddToCart() {
    console.log('Stored Cart', this.storedCart);
    this.cart_array = [];
    this.file_type = [];
    this.beat_files.map(m => {
      if (m.is_selected == true) {
        this.file_type.push({
          type: m.file_type,
          price: m.price,
        });
      }
    });
    this.cart_array.push({
      beat_title: this.beat_files[0].name,
      beat_type: this.beat_files[0].type,
      beat_id: this.beat_files[0].id,
      files: this.file_type,
      final_price: 0,
    });
    console.log(this.cart_array);
    if (this.file_type.length == 0) {
      this.toast.showToast('Please select file type');
    } else {
      let count = 0;
      if (this.storedCart != null) {
        for (let i in this.storedCart) {
          if (this.storedCart[i].beat_id == this.cart_array[0].beat_id) {
            this.storedCart[i] = this.cart_array[0];
            count++;
          }
        }
        if (count == 0) {
          this.storedCart.push(this.cart_array[0]);
        }
      } else {
        this.storedCart = this.cart_array;
      }
      console.log('Stored Cart after edit', this.storedCart);
      this.common.setCartItem('my_cart', this.storedCart);
      this.toast.showToast('Added to cart Sucessfully');
    }
  }

  selectItemForCart(file) {
    this.beat_files.map(m => {
      if (file.file_type == m.file_type) {
        if (file.is_selected == false) {
          m.is_selected = true;
        } else {
          m.is_selected = false;
        }
      }
    });
    console.log(this.beat_files);
  }
  play(track, index) {
    console.log('play..', track);
    this.currentTrack = track;
    this.currentIndex = index;
    console.log(
      this.currentTrack,
      'this.currentTrack',
      this.currentIndex,
      'this.currentIndex'
    );
    this.musicControls.destroy();
    this.musicControls.create({
      track: track.title, // optional, default : ''
      artist: track.artist, // optional, default : ''
      cover: track.art, // optional, default : nothing
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
      console.log('action', action);
      const message = JSON.parse(action).message;
      console.log(message, 'message');
      switch (message) {
        case 'music-controls-pause':
          console.log('musc pause');
          this.audioTrack._audioTrack.pause();
          this.onPause();
          break;
        case 'music-controls-play':
          console.log('music play');
          this.audioTrack._audioTrack.play();
          this.onPlay();
          break;
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

  onPause() {
    console.log('onPaues');
    this.musicControls.updateIsPlaying(false);
    this.is_pause = true;
  }
  onPlay() {
    console.log('onPlay');

    console.log(this.audioTrack._audioTrack, 'this.audioTrack._audioTrack');
    this.musicControls.updateIsPlaying(true);
    this.is_pause = false;
  }
  next() {
    console.log(this.currentIndex, this.playlist.length);
    if (
      this.playlist.length > 0 &&
      this.currentIndex >= 0 &&
      this.currentIndex < this.playlist.length - 1
    ) {
      let i = this.currentIndex + 1;
      this.currentIndex = i;
      let track = this.playlist[i];
      console.log('if enter', i, track);
      this.play(track, i);
      this.selected_track = track;
      this.getbeatFiles();
      //  this._cdRef.detectChanges();
      this.active_list = this.playlist[i];
    } else if (
      (this.currentIndex == -1 && this.playlist.length > 0) ||
      this.currentIndex == this.playlist.length - 1
    ) {
      console.log('else enter');
      this.currentIndex = 0;
      let track = this.playlist[0];
      this.selected_track = track;
      this.play(this.playlist[0], 0);
      console.log(this.playlist[0]);
      this.getbeatFiles();
      //   this._cdRef.detectChanges();
      this.active_list = this.playlist[0];
    }
  }

  onTrackFinished(track: any) {
    this.next();
  }
  back() {
    if (
      this.playlist.length > 0 &&
      this.currentIndex > 0 &&
      this.currentIndex <= this.playlist.length - 1
    ) {
      let i = this.currentIndex - 1;
      this.currentIndex = i;
      let track = this.playlist[i];
      console.log('if enter', i, track);
      this.play(track, i);
      this.selected_track = track;
      this.getbeatFiles();
      //   this._cdRef.detectChanges();
      this.active_list = this.playlist[i];
    } else if (
      (this.currentIndex == -1 && this.playlist.length > 0) ||
      this.currentIndex == 0
    ) {
      console.log('else enter');
      this.currentIndex = this.playlist.length - 1;
      let track = this.playlist[this.playlist.length - 1];
      this.selected_track = track;
      this.play(
        this.playlist[this.playlist.length - 1],
        this.playlist.length - 1
      );
      console.log(this.playlist[this.playlist.length - 1]);
      this.getbeatFiles();
      //this._cdRef.detectChanges();
      this.active_list = this.playlist[0];
    }
  }

  getbeatFiles() {
    this.beat_files = [];
    let tempArr = [];
    this.my_track = this.all_tracks.filter(
      x1 => x1.beat_id == this.selected_track['id']
    );
    this.my_track = this.my_track[0];
    console.log(this.my_track, 'tttt...');
    this.storage.get('my_cart').then(val => {
      console.log('Your my_cart is', val);
      this.storedCart = val;
      if (val != null) {
        let tempArray = [];
        let tempbeat = [];
        console.log('this.my_track.beat_files', this.my_track.beat_files);
        for (let c in this.storedCart) {
          if (this.storedCart[c].beat_id == this.my_track.beat_id) {
            for (let f in this.storedCart[c].files) {
              tempArray.push({file_type: this.storedCart[c].files[f].type});
            }
          }
        }
        for (let i in this.my_track.beat_files) {
          tempbeat.push({
            file_type: this.my_track.beat_files[i].file_type,
            price: this.my_track.beat_files[i].file_price,
            id: this.my_track.beat_id,
            type: this.my_track.category_list[0],
            name: this.my_track.beat_title,
            is_selected: false,
          });
        }

        for (let t in tempArray) {
          for (let i in tempbeat) {
            if (tempArray[t].file_type == tempbeat[i].file_type) {
              tempbeat[i].is_selected = true;
            }
          }
        }
        this.beat_files = tempbeat;
      } else {
        for (let i in this.my_track.beat_files) {
          this.beat_files.push({
            file_type: this.my_track.beat_files[i].file_type,
            price: this.my_track.beat_files[i].file_price,
            id: this.my_track.beat_id,
            type: this.my_track.category_list[0],
            name: this.my_track.beat_title,
            is_selected: false,
          });
        }
      }
    });
    //  for(let i in this.my_track[0].beat_files){
    //    console.log(i,"iiiii....",)
    //    tempArr.push({
    //      'file_type':this.my_track[0].beat_files[i].file_type,
    //      'price' :this.my_track[0].beat_files[i].file_price,
    //      'id':this.my_track[0].beat_id,
    //      'type':this.my_track[0].category_list[0],
    //      'name':this.my_track[0].beat_title,
    //      'is_selected':false
    //    })
    //  }
    //   this.beat_files=tempArr;
    //this._cdRef.detectChanges();
  }
  getAllSongs() {
    this.common.get_all_songs().subscribe(
      res => {
        this.all_tracks = res;
        this.my_track = this.all_tracks[0];
        console.log(this.all_tracks);
        this.storage.get('my_cart').then(val => {
          console.log('Your my_cart is', val);
          this.storedCart = val;
          if (val != null) {
            let tempArray = [];
            let tempbeat = [];
            console.log('this.my_track.beat_files', this.my_track.beat_files);
            for (let c in this.storedCart) {
              if (this.storedCart[c].beat_id == this.my_track.beat_id) {
                for (let f in this.storedCart[c].files) {
                  tempArray.push({file_type: this.storedCart[c].files[f].type});
                }
              }
            }
            for (let i in this.my_track.beat_files) {
              tempbeat.push({
                file_type: this.my_track.beat_files[i].file_type,
                price: this.my_track.beat_files[i].file_price,
                id: this.my_track.beat_id,
                type: this.my_track.category_list[0],
                name: this.my_track.beat_title,
                is_selected: false,
              });
            }

            for (let t in tempArray) {
              for (let i in tempbeat) {
                if (tempArray[t].file_type == tempbeat[i].file_type) {
                  tempbeat[i].is_selected = true;
                }
              }
            }
            this.beat_files = tempbeat;
          } else {
            for (let i in this.my_track.beat_files) {
              this.beat_files.push({
                file_type: this.my_track.beat_files[i].file_type,
                price: this.my_track.beat_files[i].file_price,
                id: this.my_track.beat_id,
                type: this.my_track.category_list[0],
                name: this.my_track.beat_title,
                is_selected: false,
              });
            }
          }
        });

        this.myTracks = [
          {
            src: this.my_track.beat_files['mp3'].file_path,
            artist: this.my_track.producer[0],
            title: this.my_track.beat_title,
            art: this.my_track.beat_cover,
            id: this.my_track.beat_id,
            preload: 'metadata',
          },
        ];
        this.selected_track = this.myTracks[0];
        this.all_tracks.map(m => {
          if (this.my_track.beat_id != m.beat_id) {
            this.myTracks.push({
              src: m.beat_files['mp3'].file_path,
              artist: m.producer[0],
              title: m.beat_title,
              art: m.beat_cover,
              preload: 'metadata',
              id: m.beat_id,
            });
          }
        });
        this.playlist = this.myTracks;
        this.active_list = this.playlist[0];
        this.play(this.playlist[0], 0);
        console.log(this.playlist, 'playlsit.....');
      },
      err => {}
    );
  }

  chooseTrack(item, index) {
    console.log(item, 'chooseTrack', index);
    this.beat_files = [];
    this.active_list = item;
    this.currentIndex = index;
    this.selected_track = item;
    this.play(this.playlist[index], index);
    console.log(this.all_tracks);
    this.my_track = this.all_tracks[index];
    this.storage.get('my_cart').then(val => {
      console.log('Your my_cart is', val);
      this.storedCart = val;
      if (val != null) {
        let tempArray = [];
        let tempbeat = [];
        console.log('this.my_track.beat_files', this.my_track.beat_files);
        for (let c in this.storedCart) {
          if (this.storedCart[c].beat_id == this.my_track.beat_id) {
            for (let f in this.storedCart[c].files) {
              tempArray.push({file_type: this.storedCart[c].files[f].type});
            }
          }
        }
        for (let i in this.my_track.beat_files) {
          tempbeat.push({
            file_type: this.my_track.beat_files[i].file_type,
            price: this.my_track.beat_files[i].file_price,
            id: this.my_track.beat_id,
            type: this.my_track.category_list[0],
            name: this.my_track.beat_title,
            is_selected: false,
          });
        }

        for (let t in tempArray) {
          for (let i in tempbeat) {
            if (tempArray[t].file_type == tempbeat[i].file_type) {
              tempbeat[i].is_selected = true;
            }
          }
        }
        this.beat_files = tempbeat;
      } else {
        for (let i in this.my_track.beat_files) {
          this.beat_files.push({
            file_type: this.my_track.beat_files[i].file_type,
            price: this.my_track.beat_files[i].file_price,
            id: this.my_track.beat_id,
            type: this.my_track.category_list[0],
            name: this.my_track.beat_title,
            is_selected: false,
          });
        }
      }
    });
  }
  checkActive(item) {
    return item == this.active_list;
  }
}
