import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
	
  	constructor(private http: HttpClient) { }

  	getWeather(city) {
  		return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + environment.WeatherApiKey);
  	}

    getWeatherIconSrc(condition) { //eigene Komponente
    	let icon: String;
    switch(condition) {
      default:
        icon = '01d';
        break;
      case 'clear sky': 
        icon = '01d';
        break; 
      case 'few clouds': 
        icon = '02d';
        break; 
      case 'scattered clouds': 
        icon = '03d';
        break;
      case 'shower rain': 
        icon = '09d';
        break;
      case 'rain': 
        icon = '10d';
        break;
      case 'thunderstorm': 
        icon = '11d';
        break;
      case 'snow': 
        icon = '13d';
        break;
      case 'mist': 
        icon = '50d';
        break; 
      case 'broken clouds': 
        icon = '04d';
        break; 
      case 'overcast clouds':
        icon = '04d';
        break;
      case 'light rain':
        icon = '10d';
        break;
    }
    let iconSrc = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    return iconSrc;
  }

}
