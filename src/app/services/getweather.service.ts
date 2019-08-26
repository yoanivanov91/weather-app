import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  	constructor(private http: HttpClient) { }

  	getWeather(city) {
  		return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + environment.WeatherApiKey);
  	}
}
