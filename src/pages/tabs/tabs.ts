import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { WeatherPage } from '../weather/weather';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeatherPage;
  tab2Root = SettingsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
