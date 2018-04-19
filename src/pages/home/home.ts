import {Component, ChangeDetectorRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {Network} from '@ionic-native/network';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  network_type: boolean = true;
  filter_data = [
    {
      title: 'genre',
      sub_cat: [],
      on_click: false,
      name: '',
    },
    {
      title: 'instruments',
      sub_cat: [],
      on_click: false,
      name: '',
    },
    {
      title: 'producer',
      sub_cat: [],
      on_click: false,
      name: '',
    },
    {
      title: 'soundslike',
      sub_cat: [],
      on_click: false,
      name: '',
    },
  ];
  constructor(
    public navCtrl: NavController,
    public common: CommonProvider,
    public network: Network,
    private _cdRef: ChangeDetectorRef
  ) {
    for (let i in common.filter) {
      for (let j in this.filter_data) {
        if (i == this.filter_data[j].title) {
          //console.log(j,this.filter_data[j].name,i)
          this.filter_data[j].name = i;
          for (let k in common.filter[i]['categories']) {
            this.filter_data[j].sub_cat.push({
              title: common.filter[i]['categories'][k].title,
              id: common.filter[i]['categories'][k].id,
            });
          }
        } else console.log(j, this.filter_data[j].name, i);
      }
    }
    console.log('filer data', this.filter_data);
    console.log(this.common.slider_images, 'slider_images');
    this.check_connectivity();
    console.log();
  }

  check_connectivity() {
    this.network.onConnect().subscribe(
      data => {
        this.network_type = true;
        this._cdRef.detectChanges();
      },
      error => console.error(error)
    );
    this.network.onDisconnect().subscribe(
      data => {
        this.network_type = false;
        this._cdRef.detectChanges();
      },
      error => console.error(error)
    );
  }

  onSearch() {
    this.navCtrl.push('SearchPage');
  }
  goToCart() {
    this.navCtrl.push('MycartPage');
  }

  goToCategoryPage(item) {
    this.common.beats_by_category(item.id).subscribe(
      res => {
        this.navCtrl.push('CategoryPage');
      },
      err => {
        this.navCtrl.push('CategoryPage');
      }
    );
  }

  filter() {
    this.navCtrl.push('FilterPage');
  }
}
