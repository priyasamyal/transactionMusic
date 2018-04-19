import {HttpClient} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {ApiProvider} from '../api/api';
import {Events} from 'ionic-angular';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Storage} from '@ionic/storage';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  genre_music: Object[] = [];
  producer_cat: Object[] = [];
  instrument_cat: Object[] = [];
  sound_like_cat: Object[] = [];

  filter: Object[] = [];

  beat_by_producer: Object[] = [];
  beat_by_cat: Object[] = [];

  slider_images: Object[] = [];

  constructor(
    public events: Events,
    public http: Http,
    public api: ApiProvider,
    private storage: Storage
  ) {
    console.log('Hello CommonProvider Provider');
  }
  get_all_category() {
    console.log('getCategory');
    return this.http
      .get(this.api.server_base_url)
      .map((res: Response) => {
        console.log('getCategory', res.json().home_filters);
        this.slider_images = res.json().home_sliders;
        this.filter = res.json().home_filters;
        this.genre_music = res.json().home_filters.genre.categories;
        this.producer_cat = res.json().home_filters.producer.categories;
        this.instrument_cat = res.json().home_filters.instruments.categories;
        this.sound_like_cat = res.json().home_filters.soundslike.categories;
        return res.json();
      })
      .catch((error: any) => {
        console.log('getCategory err', error);
        return Observable.throw(error.json().error || error);
      });
  }

  beats_by_producer(id) {
    let body = {};
    console.log('beats_by_producer');
    return this.http
      .post(
        'http://transactionmusic.com/api/v1/beats-by-producer/' +
          id +
          '?api_token=piDIHsO36SnAaG0tKShrGzUC1ekGuUrQJAHxn2R4tgvJ2VE7yE3stwhX3LZi',
        body
      )
      .map((res: Response) => {
        console.log('beats_by_producer', res.json());
        this.beat_by_producer = res.json();
        return res.json();
      })
      .catch((error: any) => {
        console.log('beats_by_producer err', error);
        return Observable.throw(error.json().error || error);
      });
  }

  beats_by_category(id) {
    console.log(id);
    let body = {};
    console.log('beats_by_category');
    return this.http
      .post(
        'http://transactionmusic.com/api/v1/beats-by-category/' +
          id +
          '?api_token=piDIHsO36SnAaG0tKShrGzUC1ekGuUrQJAHxn2R4tgvJ2VE7yE3stwhX3LZi',
        body
      )
      .map((res: Response) => {
        console.log('beats_by_category', res.json());
        this.beat_by_cat = res.json();
        return res.json();
      })
      .catch((error: any) => {
        console.log('beats_by_category err', error);
        return Observable.throw(error.json().error || error);
      });
  }
  beats_by_filter(type, id) {
    let body = {};
    console.log('beats_by_filter');
    return this.http
      .post(
        'http://transactionmusic.com/api/v1/beats-by-filter/' +
          type +
          '/' +
          id +
          '?api_token=piDIHsO36SnAaG0tKShrGzUC1ekGuUrQJAHxn2R4tgvJ2VE7yE3stwhX3LZi',
        body
      )
      .map((res: Response) => {
        console.log('beats_by_filter', res.json());
        this.beat_by_cat = res.json();
        return res.json();
      })
      .catch((error: any) => {
        console.log('beats_by_filter err', error);
        return Observable.throw(error.json().error || error);
      });
  }

  get_beat_by_search(search_string) {
    let body = {};
    console.log('beat_by_search');
    return this.http
      .post(
        'http://transactionmusic.com/api/v1/beats-by-search/' +
          search_string +
          '?api_token=piDIHsO36SnAaG0tKShrGzUC1ekGuUrQJAHxn2R4tgvJ2VE7yE3stwhX3LZi',
        body
      )
      .map((res: Response) => {
        console.log('beat_by_search', res.json());
        return res.json().beats_by_search;
      })
      .catch((error: any) => {
        console.log('beat_by_search err', error);
        return Observable.throw(error.json().error || error);
      });
  }

  get_all_songs() {
    let body = {};
    console.log('beat_by_search');
    return this.http
      .get(
        'http://transactionmusic.com/api/v1/all-beats?api_token=piDIHsO36SnAaG0tKShrGzUC1ekGuUrQJAHxn2R4tgvJ2VE7yE3stwhX3LZi'
      )
      .map((res: Response) => {
        console.log('get_all_songs', res.json());
        return res.json().beats;
      })
      .catch((error: any) => {
        console.log('get_all_songs err', error);
        return Observable.throw(error.json().error || error);
      });
  }

  payment(data) {
    console.log('Input json', data);

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = new RequestOptions({headers: headers});
    let body = this.serialize(data, 0);
    //let body = data;
    console.log(body, 'data_encoding....');
    console.log('payment api Hit');
    return this.http
      .post(
        'http://transactionmusic.com/api/mobile/payment?api_token=piDIHsO36SnAaG0tKShrGzUC1ekGuUrQJAHxn2R4tgvJ2VE7yE3stwhX3LZi',
        body,
        options
      )
      .map((res: Response) => {
        console.log('payment response', res);
        return res.json();
      })
      .catch((error: any) => {
        console.log('payment err', error);
        return Observable.throw(error.json().error || error);
      });
  }

  data_encoding(data: any) {
    const body = new URLSearchParams();
    Object.keys(data).forEach(key => {
      body.set(key, data[key]);
    });
    //console.log(body,"data_encoding....")
    return body.toString();
  }

  
  serialize = function(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + '[' + p + ']' : p,
          v = obj[p];
        str.push(
          v !== null && typeof v === 'object'
            ? this.serialize(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v)
        );
      }
    }
    return str.join('&');
  };


  setCartItem(key, value) {
    this.storage.set(key, value);
  }


  getItem(key) {
    this.storage.get(key).then(val => {
      if (key != null) {
      }
      console.log(val, 'val');
      this.events.publish('cart_get', val, Date.now());
    });
  }

  removeItem(key) {
    this.storage.remove(key).then(val => {
      console.log(val, 'val');
    });
  }
}
