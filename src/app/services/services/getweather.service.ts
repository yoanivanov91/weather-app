import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
/*import { Subject } from 'rxjs';
import { City } from '../../others/model/city';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';*/

@Injectable({
  providedIn: 'root'
})

export class GetWeatherService {
	
    /*private citySubject = new Subject<City>();
    public cityObs = this.citySubject.asObservable();
    private weatherData: any;
    private currentUser: any;
    private locationData: any;
    private city: City;
    public statusOK: boolean; */

  	constructor(private http: HttpClient
                /*private authenticationService: AuthenticationService,
                private alertService: AlertService*/) { 
      //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

   /* public get status() {
      return this.statusOK;
    }

    clearCityValue() {
      this.citySubject.next(null);
    }*/

  	getWeather(city) {
  		return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=' + environment.WeatherApiKey);
  	}

    getLocation() {
      return this.http.get('https://ip-api.com/json/');
    }

    getWeatherByCoordinates(lat, lon) {
      return this.http.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&cnt=1&appid=' + environment.WeatherApiKey);
    }

    /*getWeatherForCity(city) {
      this.getWeather(city).subscribe(data => {
        this.weatherData = data;
        this.city = new City(this.weatherData.name, Math.round(this.weatherData.main.temp), this.weatherData.weather[0].main, Math.round(this.weatherData.main.humidity), this.weatherData.wind.speed);
        if(this.currentUser) { this.city.userid = this.currentUser._id };
        this.citySubject.next(this.city);
        this.alertService.clearMessage();
        this.statusOK = true;
      }, () => { this.statusOK = false; this.alertService.sendMessage('City not found', 'error'); });
    }

    getWeatherForCurrentLocation() {
      this.getLocation().subscribe(data => {
        this.locationData = data;
        this.getWeatherForCity(this.locationData.city);
      }, () => this.alertService.sendMessage('Location not found', 'error'));
    }*/

}
