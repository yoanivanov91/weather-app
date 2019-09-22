import { Injectable } from '@angular/core';
import { City } from '../../others/model/city';
import { AuthenticationService } from './authentication.service';
import { RestApiService } from './restapi.service';
import { GetWeatherService } from './getweather.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoriteNames: any[];
  private favoriteData: any[];
  private weatherData: any;
  private favoriteList: City[] = [];
  private currentUser: any;
  private city: City;


  constructor(private restapi: RestApiService,
              private authenticationService: AuthenticationService,
              private weatherService: GetWeatherService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getFavorites();
  }

  /*async getFavorites() {
    if(this.currentUser) {
      await this.restapi.getFavorites(this.currentUser._id).subscribe(data => {
                     this.favoriteNames = data;
                     this.favoriteNames.forEach(city => {
        this.weatherService.getWeatherForCity(city.name);
        this.weatherService.cityObs.subscribe(x => { 
          this.city = x; 
          let foundCity = this.favoriteList.find(each => each.name === this.city.name);
          if (!foundCity) { this.favoriteList.push(this.city); }
        });
      }); });
    }
  }*/
  getFavorites() {
    if(this.currentUser) {
      this.restapi.getFavorites(this.currentUser._id).subscribe(data => { this.favoriteData = data;
                     this.favoriteNames = this.favoriteData;;
                     this.favoriteNames.forEach(city => {
        this.weatherService.getWeather(city.name).subscribe(data => {
          this.weatherData = data;
          this.city = new City(this.weatherData.city.name, this.weatherData.city.country, Math.round(this.weatherData.list[0].main.temp), Math.round(this.weatherData.list[0].main.temp_max), Math.round(this.weatherData.list[0].main.temp_min), this.weatherData.list[0].weather[0].main, Math.round(this.weatherData.list[0].main.humidity), this.weatherData.list[0].wind.speed);
          this.city.addedOnDate = city.createdDate;
          this.city.day1 = new Date(this.weatherData.list[8].dt * 1000);
      this.city.day1temp = Math.round(this.weatherData.list[8].main.temp);
      this.city.day1maxtemp = Math.round(this.weatherData.list[8].main.temp_max);
      this.city.day1mintemp = Math.round(this.weatherData.list[8].main.temp_min);
      this.city.day1weather = this.weatherData.list[8].weather[0].main;
      this.city.day1humidity = this.weatherData.list[8].main.humidity;
      this.city.day1windspeed = this.weatherData.list[8].wind.speed;

      this.city.day2 = new Date(this.weatherData.list[16].dt * 1000);
      this.city.day2temp = Math.round(this.weatherData.list[16].main.temp);
      this.city.day2maxtemp = Math.round(this.weatherData.list[16].main.temp_max);
      this.city.day2mintemp = Math.round(this.weatherData.list[16].main.temp_min);
      this.city.day2weather = this.weatherData.list[16].weather[0].main;
      this.city.day2humidity = this.weatherData.list[16].main.humidity;
      this.city.day2windspeed = this.weatherData.list[16].wind.speed;

      this.city.day3 = new Date(this.weatherData.list[24].dt * 1000);
      this.city.day3temp = Math.round(this.weatherData.list[24].main.temp);
      this.city.day3maxtemp = Math.round(this.weatherData.list[24].main.temp_max);
      this.city.day3mintemp = Math.round(this.weatherData.list[24].main.temp_min);
      this.city.day3weather = this.weatherData.list[24].weather[0].main;
      this.city.day3humidity = this.weatherData.list[24].main.humidity;
      this.city.day3windspeed = this.weatherData.list[24].wind.speed;
          let foundCity = this.favoriteList.find(each => each.name === city.name);
          if (!foundCity) { this.favoriteList.push(this.city); }
        });
      }); });
    }
  }

  getFavoriteList(): City[] {
    //console.log(this.favoriteList);
    //this.favoriteList.sort((a, b) => new Date(a.addedOnDate).getTime() - new Date(b.addedOnDate).getTime());
    return this.favoriteList;
  }

  emptyFavoriteList() {
    this.favoriteList = [];
  }

  addToFavorites(city: City) {
    this.favoriteList.push(city);
    this.restapi.addToFavorites(city).subscribe(() => this.getFavoriteList());
  }

  removeFromFavorites(userid: String, city: City) {
    this.favoriteList = this.favoriteList.filter(x => x.name !== city.name);
    this.restapi.removeFromFavorites(userid, city).subscribe(() => {
        console.log(city.name + ' is deleted');
        if(this.favoriteList.length > 0) {
          if(document.getElementById('0')) {
            document.getElementById('0').classList.add('active');
          }
          if(this.favoriteList.length > 1) {
            if(document.getElementById('indi0')) {
              document.getElementById('indi0').classList.add('active');
            }
          }
        }
        this.getFavoriteList();
     }, () => console.log('Error by deleting ' + city.name));
  }

  isFavorite(city: City): boolean {  //Promise mit Async pipe
    let foundCity = this.favoriteList.find(each => each.name === city.name);
    if (foundCity) {
       return true;
    }
    else { return false; }
  }

}
