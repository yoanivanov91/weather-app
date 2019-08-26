import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetWeatherService } from '../services/getweather.service';
import { City } from '../model/city';

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
  public errmsg: String;

  constructor(private fb: FormBuilder,
              private weatherservice: GetWeatherService) {
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

    if (this.weatherForm.invalid) {
      this.submitted = false;
      this.errmsg = "Please enter a city";
      return;
    }
    this.errmsg = "";
    let result = this.weatherservice.getWeather(formValue.city);
    result.subscribe(data => {
      this.weatherData = data;
      this.city = new City(this.weatherData.name, this.weatherData.main.temp, this.weatherData.main.humidity, this.weatherData.wind.speed)
    });
  }

}
