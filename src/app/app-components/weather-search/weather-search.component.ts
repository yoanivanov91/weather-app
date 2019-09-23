import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetWeatherService } from '../../services/services/getweather.service';
import { AuthenticationService } from '../../services/services/authentication.service';
import { City } from '../../others/model/city';
import { AlertService } from '../../services/services/alert.service';
import { CurrentLocationService } from '../../services/services/current-location.service';
declare const $: any;

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {

  public submitted = false;
  public weatherForm: FormGroup;
  public weatherData: any;
  public city: City;
  public currentUser: any;

  constructor(private fb: FormBuilder,
              private weatherService: GetWeatherService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private currentLocationService: CurrentLocationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.weatherForm = this.fb.group({
      city: ['', Validators.required]
    });
    this.currentLocationService.clicked.subscribe(x => this.clickToGo(x));
  }

  get f() {
    return this.weatherForm.controls;
  }

  async clickToGo(cityname: String) {
    await this.f.city.setValue(cityname);
    await $("#submitbutton").click();
  }

  onSubmit(formValue) {

    if (this.weatherForm.invalid) {
      this.submitted = false;
      this.alertService.sendMessage('Please enter a city', 'error');
      return;
    }

    if(!this.f.city.value) { this.submitted = false; return; }
    this.weatherService.getWeather(formValue.city).subscribe(data => {
      this.submitted = true;
      this.alertService.clearMessage();
      this.weatherData = data;
      this.city = new City(this.weatherData.city.name, this.weatherData.city.country, Math.round(this.weatherData.list[0].main.temp), Math.round(this.weatherData.list[0].main.temp_max), Math.round(this.weatherData.list[0].main.temp_min), this.weatherData.list[0].weather[0].main, Math.round(this.weatherData.list[0].main.humidity), Math.round(this.weatherData.list[0].wind.speed * 10) / 10);
      if(this.currentUser) { this.city.userid = this.currentUser._id };

      this.city.day1 = new Date(this.weatherData.list[8].dt * 1000);
      this.city.day1temp = Math.round(this.weatherData.list[8].main.temp);
      this.city.day1maxtemp = Math.round(this.weatherData.list[8].main.temp_max);
      this.city.day1mintemp = Math.round(this.weatherData.list[8].main.temp_min);
      this.city.day1weather = this.weatherData.list[8].weather[0].main;

      this.city.day2 = new Date(this.weatherData.list[16].dt * 1000);
      this.city.day2temp = Math.round(this.weatherData.list[16].main.temp);
      this.city.day2maxtemp = Math.round(this.weatherData.list[16].main.temp_max);
      this.city.day2mintemp = Math.round(this.weatherData.list[16].main.temp_min);
      this.city.day2weather = this.weatherData.list[16].weather[0].main;

      this.city.day3 = new Date(this.weatherData.list[24].dt * 1000);
      this.city.day3temp = Math.round(this.weatherData.list[24].main.temp);
      this.city.day3maxtemp = Math.round(this.weatherData.list[24].main.temp_max);
      this.city.day3mintemp = Math.round(this.weatherData.list[24].main.temp_min);
      this.city.day3weather = this.weatherData.list[24].weather[0].main;
    }, () => {
      this.submitted = false;
      this.alertService.sendMessage('City not found', 'error');
      });
  }
}
