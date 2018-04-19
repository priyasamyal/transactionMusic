import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  gaming = 'nes';
  search_list = [];
  search_string: string = '';
  isFetching: boolean = false;
  message: string = '';
  is_start: boolean = true;
  constructor(
    public common: CommonProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log(this.search_list.length);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  searchByKeyword(event) {
    this.isFetching = true;
    this.is_start = false;

    this.getSearchList();
  }

  getSearchList() {
    this.common.get_beat_by_search(this.search_string).subscribe(
      res => {
        this.search_list = res;
        if (this.search_list.length == 0) {
          this.message = 'No result found';
        }
        this.isFetching = false;
        console.log('search', this.search_list);
      },
      err => {}
    );
  }

  playTrack(track) {
    console.log(track);
    this.navCtrl.push('PlaySearchPage', {track: track});
  }
}
