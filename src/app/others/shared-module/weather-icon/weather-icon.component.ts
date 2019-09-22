import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
declare const require: any;

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css']
})
export class WeatherIconComponent implements OnInit, OnDestroy, OnChanges {

	@Input() public weatherCondition;
  @Input() public width;
  @Input() public height;
  public iconSrc: String;

	public codes: any[] = [
		{ condition: 'Thunderstorm', icon: 'thunderstorm.png' },
    { condition: 'Drizzle', icon: 'drizzle.png' },
    { condition: 'Rain', icon: 'rain.png' },
    { condition: 'Snow', icon: 'snow.png' },
    { condition: 'Mist', icon: 'fog.png' },
    { condition: 'Smoke', icon: 'fog.png' },
    { condition: 'Haze', icon: 'fog.png' },
    { condition: 'Dust', icon: 'fog.png' },
    { condition: 'Fog', icon: 'fog.png' },
    { condition: 'Sand', icon: 'fog.png' },
    { condition: 'Dust', icon: 'fog.png' },
    { condition: 'Ash', icon: 'fog.png' },
    { condition: 'Squall', icon: 'fog.png' },
    { condition: 'Tornado', icon: 'tornado.png' },
    { condition: 'Clear', icon: 'sun.png' },
    { condition: 'Clouds', icon: 'clouds.png' }
	];

  	constructor() { }

  	ngOnInit() {
  		this.getWeatherIconSrc();
  	}

    ngOnChanges() {
      this.getWeatherIconSrc();
    }

  	getWeatherIconSrc() { //eigene Komponente
    	let city = this.codes.find(x => x.condition === this.weatherCondition);
      if(city) {
        this.iconSrc = require('../../../images/icons/best/' + city.icon);
      }
      else {
        return;
      }
    }

    ngOnDestroy() {
      this.iconSrc = null;
    }
}
