import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetWeatherService } from '../../services/services/getweather.service';
import { AuthenticationService } from '../../services/services/authentication.service';
//import { FavoriteService } from '../../services/services/favorite.service';
import { City } from '../../others/model/city';
import { AlertService } from '../../services/services/alert.service';

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
  public iconSrc: String;

  constructor(private fb: FormBuilder,
              private weatherService: GetWeatherService,
              private authenticationService: AuthenticationService,
              //private favoriteService: FavoriteService,
              private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

    this.weatherForm = this.fb.group({
      city: ['', Validators.required]
    });

    /*if(this.currentUser) {
      this.favoriteService.getFavorites();
    }*/

  }

  get f() {
    return this.weatherForm.controls;
  }

  onSubmit(formValue) {

    if (this.weatherForm.invalid) {
      this.submitted = false;
      //this.errmsg = "Please enter a city";
      this.alertService.sendMessage('Please enter a city', 'error');
      //this.loading = false;
      return;
    }

    if(!this.f.city.value) { this.submitted = false; return; }
    this.weatherService.getWeather(formValue.city).subscribe(data => {
      this.submitted = true;
      this.alertService.clearMessage();
      this.weatherData = data;
      this.city = new City(this.weatherData.name, Math.round(this.weatherData.main.temp), this.weatherData.weather[0].description, Math.round(this.weatherData.main.humidity), this.weatherData.wind.speed);
      this.city.weatherIcon = this.weatherService.getWeatherIconSrc(this.city.weather);
      if(this.currentUser) { this.city.userid = this.currentUser._id };
    }, () => {
      this.submitted = false;
      this.alertService.sendMessage('City not found', 'error');
      });
  }
}
