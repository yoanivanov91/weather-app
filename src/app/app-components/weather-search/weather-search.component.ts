import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetWeatherService } from '../../others/services/getweather.service';
import { AuthenticationService } from '../../others/services/authentication.service';
import { City } from '../../others/model/city';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {

  public title = 'New Weather App';
  public submitted = false;
  public weatherForm: FormGroup;
  public weatherData: any;
  public city: City;
  public errmsg: String;
  public currentUser: any;
  public loading = false;

  constructor(private fb: FormBuilder,
              private weatherService: GetWeatherService,
              private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {

    this.weatherForm = this.fb.group({
      city: ['', Validators.required]
    });

  }

  get f() {
    return this.weatherForm.controls;
  }

  onSubmit(formValue) {
    this.submitted = true;
    this.loading = true;

    if (this.weatherForm.invalid) {
      this.submitted = false;
      this.errmsg = "Please enter a city";
      this.loading = false;
      return;
    }
    this.errmsg = "";
    let result = this.weatherService.getWeather(formValue.city);
    result.subscribe(data => {
      this.weatherData = data;
      this.city = new City(this.weatherData.name, this.weatherData.main.temp, this.weatherData.weather[0].description, this.weatherData.main.humidity, this.weatherData.wind.speed);
      if(this.currentUser) { this.city.userid = this.currentUser._id };
      this.loading = false;
    });
  }

}
