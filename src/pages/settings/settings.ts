import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation'


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  cityName: String;
  cityId: String;
  lon: String;
  lat: String;
  searchList: any = [];
  searchString: String;
  showList: Boolean;
  currentCity: Boolean;
  gps: Boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private weatherProvider: WeatherProvider,
    private storage: Storage,
    private geolocation: Geolocation,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    this.showList = false;

    this.currentCity = true;
    this.storage.get('location').then(city => {
      if (city) {
        this.lon = city.coord.lon;
        this.lat = city.coord.lat;
        this.gps = city.gps;
        if (!city.gps) {
          this.cityName = city.name;
          this.cityId = city.id;
        }
      } else {
        this.gps = false;
        this.cityName = "Ranchi";
        this.cityId = "1258526";
        this.lon = "85.333328";
        this.lat = "23.35";
      }
    });
  }

  getAndStoreLocation() {
    let loading = this.loadingCtrl.create({
    content: 'Determining Your Location'
    });
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loading.dismiss();
      const city = {
        gps: true,
        coord: {
          lon: String(resp.coords.longitude),
          lat: String(resp.coords.latitude),
        },
      };
      this.storage.set('location', city);
      this.gps = true;
      this.lon =  String(resp.coords.longitude);
      this.lat =  String(resp.coords.latitude);
    }).catch((error) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Location Not Found',
        subTitle: 'We could not determine your location, please check your gps settings',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    });
  }

  onInput() {
    this.currentCity = false;
    this.searchList = this.weatherProvider.searchCities(this.searchString);
    this.showList = true;
  }

  swipeEvent(e) {
    if(e.direction == '2'){
       this.navCtrl.parent.select(2, {animate: true});
    }
    else if(e.direction == '4'){
       this.navCtrl.parent.select(0, {animate: true});
    }
  } 


  selectCity(city) {
    city.gps = false;
    this.storage.set('location', city);
    this.cityName = city.name;
    this.cityId = city.id;
    this.lon = city.coord.lon;
    this.lat = city.coord.lat;
    this.gps = city.gps;
    this.showList = false;
    this.searchString = "";
    this.currentCity = true;
  }

}
