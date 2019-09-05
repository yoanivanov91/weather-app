import { Injectable } from '@angular/core';
import { City } from '../model/city';
import { AuthenticationService } from './authentication.service';;
import { RestApiService } from './restapi.service';
import { GetWeatherService } from './getweather.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoriteData: any;
  private favoriteNames: any[];
  private weatherData: any;
  private favoriteList: City[] = [];
  private currentUser: any;
  private city: City;


  constructor(private restapi: RestApiService,
              private authenticationService: AuthenticationService,
              private getWeatherService: GetWeatherService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getFavorites();
  }

  async getFavorites() {
    if(this.currentUser) {
      await this.restapi.getFavorites(this.currentUser._id).subscribe(data => { this.favoriteData = data;
                     this.favoriteNames = this.favoriteData;
                     this.favoriteNames.forEach(city => {
        this.getWeatherService.getWeather(city.name).subscribe(data => {
          this.weatherData = data;
          this.city = new City(this.weatherData.name, this.weatherData.main.temp, this.weatherData.weather[0].description, this.weatherData.main.humidity, this.weatherData.wind.speed);
          let foundCity = this.favoriteList.find(each => each.name === city.name);
          if (!foundCity) { this.favoriteList.push(this.city); }
        });
      }); });
    }
  }

  getFavoriteList(): City[] {
    return this.favoriteList;
  }

  emptyFavoriteList() {
    this.favoriteList = [];
  }

  addToFavorites(city: City) {
    this.restapi.addToFavorites(city).subscribe(() => this.getFavoriteList());
    this.favoriteList.push(city);
  }

  removeFromFavorites(userid: String, city: City) {
    this.restapi.removeFromFavorites(userid, city).subscribe(() => {
      let index = this.favoriteList.findIndex(x => x.name === city.name);
      if (index > -1) {
        this.favoriteList.splice(index, 1);
        console.log("Successfully removed" + city.name + "from favorites");
        this.getFavoriteList();
      }
     });
    // let index = this.favoriteList.findIndex(x => x.name === city.name);
    // if (index > -1) {
    // this.favoriteList.splice(index, 1);
    // console.log("Successfully removed" + city.name + "from favorites");
    // }
  }

  //getFavoriteID(userid: String, city: City): Observable<any> {
    //return this.restapi.getFavoriteID(userid, city).subscribe();
  //}

  isFavorite(city: City): boolean {
    let foundCity = this.favoriteList.find(each => each.name === city.name);
    if (foundCity) {
       return true;
    }
    else { return false; }
  }

}
