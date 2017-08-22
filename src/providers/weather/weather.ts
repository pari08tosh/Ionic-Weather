import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

  cityList: any = [
  {
    "id": 1275004,
    "name": "Kolkata",
    "country": "IN",
    "coord": {
      "lon": 88.36972,
      "lat": 22.569719
    }
  },
  {
    "id": 1258526,
    "name": "Ranchi",
    "country": "IN",
    "coord": {
      "lon": 85.333328,
      "lat": 23.35
    }
  },
  {
    "id": 1273294,
    "name": "Delhi",
    "country": "IN",
    "coord": {
      "lon": 77.216667,
      "lat": 28.666668
    }
  },
  {
    "id": 1277333,
    "name": "Bangalore",
    "country": "IN",
    "coord": {
      "lon": 77.603287,
      "lat": 12.97623
    }
  },
  {
    "id": 1269843,
    "name": "Hyderabad",
    "country": "IN",
    "coord": {
      "lon": 78.474442,
      "lat": 17.37528
    }
  },
  {
    "id": 1278994,
    "name": "Allahabad",
    "country": "IN",
    "coord": {
      "lon": 81.849998,
      "lat": 25.450001
    }
  },
  {
    "id": 1259229,
    "name": "Pune",
    "country": "IN",
    "coord": {
      "lon": 73.855347,
      "lat": 18.519569
    }
  },
  {
    "id": 1262180,
    "name": "Nagpur",
    "country": "IN",
    "coord": {
      "lon": 79.099998,
      "lat": 21.15
    }
  },
  {
    "id": 1264527,
    "name": "Chennai",
    "country": "IN",
    "coord": {
      "lon": 80.278473,
      "lat": 13.08784
    }
  },
  {
    "id": 1275841,
    "name": "Bhopal",
    "country": "IN",
    "coord": {
      "lon": 77.400002,
      "lat": 23.26667
    }
  },
  {
    "id": 1269743,
    "name": "Indore",
    "country": "IN",
    "coord": {
      "lon": 75.833298,
      "lat": 22.71792
    }
  },
  {
    "id": 1258980,
    "name": "Raipur",
    "country": "IN",
    "coord": {
      "lon": 81.633331,
      "lat": 21.23333
    }
  },
  {
    "id": 1260086,
    "name": "Patna",
    "country": "IN",
    "coord": {
      "lon": 85.116669,
      "lat": 25.6
    }
  },
  {
    "id": 1269515,
    "name": "Jaipur",
    "country": "IN",
    "coord": {
      "lon": 75.816666,
      "lat": 26.916668
    }
  },
  {
    "id": 1269321,
    "name": "Jammu",
    "country": "IN",
    "coord": {
      "lon": 74.866669,
      "lat": 32.73333
    }
  },
  {
    "id": 1267995,
    "name": "Kanpur",
    "country": "IN",
    "coord": {
      "lon": 80.349998,
      "lat": 26.466667
    }
  },
  {
    "id": 1253405,
    "name": "Varanasi",
    "country": "IN",
    "coord": {
      "lon": 83,
      "lat": 25.333332
    }
  },
  {
    "id": 1255364,
    "name": "Surat",
    "country": "IN",
    "coord": {
      "lon": 72.833328,
      "lat": 21.16667
    }
  },
  {
    "id": 1278710,
    "name": "Amritsar",
    "country": "IN",
    "coord": {
      "lon": 74.865562,
      "lat": 31.63306
    }
  },
];
  constructor(public http: Http) {
  }

  searchCities(searchString) {
    let re = new RegExp(searchString, 'i');
    let filter  = this.cityList.filter(city => {
      return re.test(city.name);
    });
    return filter;
  }

  getCurrentWeather(city) {
    if (city.gps) {
      return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lon=${city.coord.lon}&lat=${city.coord.lat}&APPID=1b0022354c1954527d54057d00fefbfa&units=metric`)
         .map(res => res.json());
    } else {
      return this.http.get(`http://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=1b0022354c1954527d54057d00fefbfa&units=metric`)
         .map(res => res.json());
    }
  }

  getDailyWeather(city) {
    if (city.gps) {
      return this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lon=${city.coord.lon}&lat=${city.coord.lat}&APPID=1b0022354c1954527d54057d00fefbfa&units=metric`)
         .map(res => res.json());
    } else {
      return this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?id=${city.id}&APPID=1b0022354c1954527d54057d00fefbfa&units=metric`)
         .map(res => res.json());
    }
  }
}
