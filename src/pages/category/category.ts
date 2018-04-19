import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  gaming = 'nes';
  filter: Object = {
    open: null,
    value: {},
    valueCustom: {},
  };
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

  current_page = 1;
  records_per_page = 10;
  total_page = 0;
  paginition_array = [];
  constructor(
    public toast: ToastProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public common: CommonProvider
  ) {
    console.log(common.filter, 'filter');
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

    console.log(this.navParams.get('filter_beat'), 'navParams');

    if (this.navParams.get('filter_beat') != undefined) {
      console.log('not undeined');
      this.current_page = 1;

      this.records_per_page = this.navParams.get('filter_beat').display_records;
      this.total_page = Math.ceil(
        this.common.beat_by_cat['beats_by_category'].length /
          this.records_per_page
      );
      this.changePage();
    } else {
      this.total_page = Math.ceil(
        this.common.beat_by_cat['beats_by_category'].length /
          this.records_per_page
      );
      this.changePage();
    }
    // console.log("this.filter_data",this.filter_data,this.filter_data[0].sub_cat)
  }

  // openFilter() {
  //   if (this.filter['open'] == 'filter') this.filter['open'] = null;
  //   else this.filter['open'] = 'filter';
  //   console.log('open filter', this.filter);
  //   console.log('this.filter_data', this.common.filter);
  // }

  // change(item) {
  //   for (let j in this.filter_data) {
  //     if (item.name == this.filter_data[j].name) {
  //       if (this.filter_data[j].on_click == true) {
  //         this.filter_data[j].on_click = false;
  //       } else {
  //         this.filter_data[j].on_click = true;
  //       }
  //     }
  //   }
  // }

  // apply_filter(filter, cat) {
  //   console.log('apply filter', filter, cat);
  //   this.common.beats_by_filter(filter.title, cat.id).subscribe(
  //     res => {
  //       console.log(res, 'filter data');
  //       this.filter['open'] = null;
  //     },
  //     err => {
  //       this.filter['open'] = null;
  //     }
  //   );
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }
  onSearch() {
    this.navCtrl.push('SearchPage');
  }
  goToCart() {
    this.navCtrl.push('MycartPage');
  }
  goToSingleTrackPage(item) {
    this.navCtrl.push('SingleTrackPage', {
      track: item,
      all_tracks: this.common.beat_by_cat['beats_by_category'],
    });
  }

  filter_cat() {
    this.navCtrl.push('FilterPage');
  }

  prevPage() {
    if (this.current_page > 1) {
      this.current_page--;
      this.changePage();
    }
  }

  nextPage() {
    console.log(
      this.current_page,
      'current Page',
      this.common.beat_by_cat['beats_by_category'].length
    );
    if (this.current_page < this.numPages()) {
      this.current_page++;
      this.changePage();
    }
  }

  numPages() {
    return Math.ceil(
      this.common.beat_by_cat['beats_by_category'].length /
        this.records_per_page
    );
  }

  changePage() {
    this.paginition_array = [];
    console.log('change Page', this.current_page);
    for (
      var i = (this.current_page - 1) * this.records_per_page;
      i < this.current_page * this.records_per_page;
      i++
    ) {
      if (i < this.common.beat_by_cat['beats_by_category'].length) {
        console.log(i, 'ii');
        this.paginition_array.push(
          this.common.beat_by_cat['beats_by_category'][i]
        );
      }
    }
    console.log(this.paginition_array, 'pagi array');
  }
}
