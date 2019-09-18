import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css']
})
export class WeatherIconComponent implements OnInit {

	@Input() public weatherCondition;
	public codes: any[] = [
		{ condition: 'clear sky',
		  icon: '01d' },
		{ condition: 'few clouds',
		  icon: '02d' }
	];

  	constructor() { }

  	ngOnInit() {
  		let found = this.codes.find(x => x.condition === this.weatherCondition);
  		console.log(found);
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
