import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

  currentCity: any = [];
  currentWeather: any = [];
  dailyWeather: any = [];
  showWeather: Boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public weatherProvider: WeatherProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
  }

  ionViewWillEnter(){
    this.showWeather = false;
    let loading = this.loadingCtrl.create({
    content: 'Fetching data from satelite'
    });
    loading.present();
    this.storage.get('location').then(city => {
      if (city) {
        this.currentCity = city;
      } else
      {
        this.currentCity.name = "Ranchi";
        this.currentCity.id = "1258526";
        this.currentCity.gps = false;
      }
    this.weatherProvider.getCurrentWeather(this.currentCity).subscribe(
      data => {
        this.currentWeather = data;
        this.weatherProvider.getDailyWeather(this.currentCity).subscribe(
        data => {
          this.dailyWeather = data;
          this.showWeather = true;
          loading.dismiss();
        },
      err => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error Fetching Data',
          subTitle: 'We could not get your data. Please try again',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    },
    err => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error Fetching Data',
        subTitle: 'We could not get your data. Please try again',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    )
    });
  }

  swipeEvent(e) {
    if (e.direction == '2') {
       this.navCtrl.parent.select(1, {animate: true});
    }
  }

}
