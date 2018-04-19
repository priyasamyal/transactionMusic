import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  show: boolean = false;
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
  select_value;
  select_result = '10';
  filter_item: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public common: CommonProvider,
    public toast: ToastProvider
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  change(item) {
    for (let j in this.filter_data) {
      if (item.name == this.filter_data[j].name) {
        if (this.filter_data[j].on_click == true) {
          this.filter_data[j].on_click = false;
        } else {
          this.filter_data[j].on_click = true;
        }
      }
    }
  }

  select_filter(item) {
    console.log(item, 'beat', this.select_result);
    this.filter_item = item;
  }

  apply_filter() {
    console.log(this.filter_item);
    if (this.filter_item == undefined) {
      this.toast.showToast('Please select category');
    } else {
      this.common.beats_by_category(this.filter_item.id).subscribe(
        res => {
          console.log(
            'apply filter',
            this.filter_item,
            this.select_result,
            res
          );
          this.filter_item.display_records = this.select_result;
          this.navCtrl.push('CategoryPage', {filter_beat: this.filter_item});
        },
        err => {
          this.navCtrl.push('CategoryPage');
        }
      );
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
