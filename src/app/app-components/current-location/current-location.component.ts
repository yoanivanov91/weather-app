import { Component, OnInit } from '@angular/core';
import { GetWeatherService } from '../../services/services/getweather.service';
import { City } from '../../others/model/city';
import { Router } from '@angular/router';
import { CurrentLocationService } from '../../services/services/current-location.service';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent implements OnInit {

	public city: City;
	private weatherData: any;
	//private locationData: any;
	public lat: number;
	public lon: number;

  	constructor(private weatherService: GetWeatherService,
                private currentLocationService: CurrentLocationService,
                private router: Router) {

  	}

  	ngOnInit() {
  		this.getLocation();
  	}

  	/*getCurrentLocation() {
  		this.weatherService.getLocation().subscribe(data => {
  			this.locationData = data;
  			console.log(this.locationData.city);
  			this.weatherService.getWeather(this.locationData.city).subscribe(data => {
  				this.weatherData = data;
  				this.city = new City(this.weatherData.name, Math.round(this.weatherData.main.temp), Math.round(this.weatherData.main.temp_max), Math.round(this.weatherData.main.temp_min), this.weatherData.weather[0].main, Math.round(this.weatherData.main.humidity), this.weatherData.wind.speed);
  			});
  		}); 
  	}*/

    clickEmit() {
      if(this.router.url !== '/home') {
        this.router.navigate(['/home']);
        setTimeout(() => this.currentLocationService.emitCityName(this.city.name), 500);
        return;
      }
      this.currentLocationService.emitCityName(this.city.name);
    }

  	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.weatherService.getWeatherByCoordinates(position.coords.latitude, position.coords.longitude).subscribe(data => {
	  				this.weatherData = data;
	  				this.city = new City(this.weatherData.city.name, this.weatherData.city.country, Math.round(this.weatherData.list[0].main.temp), Math.round(this.weatherData.list[0].main.temp_max), Math.round(this.weatherData.list[0].main.temp_min), this.weatherData.list[0].weather[0].main, Math.round(this.weatherData.list[0].main.humidity), Math.round(this.weatherData.list[0].wind.speed * 10) / 10);
	  			});
  			});
  		}
  		else {
  			console.log("Pech gehabt");
  		}
	}

}
