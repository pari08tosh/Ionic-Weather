import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  swipeEvent(e) {
    if (e.direction == '4') {
       this.navCtrl.parent.select(1, {animate: true});
    }
  }


}
