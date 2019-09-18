import { Injectable } from '@angular/core';
import { City } from '../../others/model/city';
import { AuthenticationService } from './authentication.service';
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
  //private favorite: Promise<boolean>|null = null;
  private city: City;


  constructor(private restapi: RestApiService,
              private authenticationService: AuthenticationService,
              private weatherService: GetWeatherService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getFavorites();
    console.log("favorites loaded");
  }

  async getFavorites() {
    if(this.currentUser) {
      await this.restapi.getFavorites(this.currentUser._id).subscribe(data => { this.favoriteData = data;
                     this.favoriteNames = this.favoriteData;
                     this.favoriteNames.forEach(city => {
        this.weatherService.getWeather(city.name).subscribe(data => {
          this.weatherData = data;
          this.city = new City(this.weatherData.name, Math.round(this.weatherData.main.temp), this.weatherData.weather[0].description, Math.round(this.weatherData.main.humidity), this.weatherData.wind.speed);
          this.city.addedOnDate = city.createdDate;
          this.city.weatherIcon = this.weatherService.getWeatherIconSrc(this.city.weather);
          let foundCity = this.favoriteList.find(each => each.name === city.name);
          if (!foundCity) { this.favoriteList.push(this.city); }
        });
      }); });
    }
  }

  getFavoriteList(): City[] {
    this.favoriteList.sort((a, b) => new Date(a.addedOnDate).getTime() - new Date(b.addedOnDate).getTime());
    return this.favoriteList;
  }

  emptyFavoriteList() {
    this.favoriteList = [];
  }

  addToFavorites(city: City) {
    this.restapi.addToFavorites(city).subscribe(() => this.getFavoriteList());
    this.favoriteList.push(city);
  }

  async removeFromFavorites(userid: String, city: City) {
     let index = this.favoriteList.findIndex(x => x.name === city.name);
     if (index > -1) {
       await this.favoriteList.splice(index, 1);
        console.log("Successfully removed " + city.name + " from favorites");
        await this.restapi.removeFromFavorites(userid, city).subscribe(() => {
        this.getFavoriteList();
     });
    }       
  }

 /*async removeAllFavoritesForUser(user) { //backend - delete user + delete all favorites for the user - user.service.js
    await this.restapi.getFavorites(user._id).subscribe(data => { this.favoriteData = data;
                     this.favoriteNames = this.favoriteData;
                     this.favoriteNames.forEach(city => {
                       this.removeFromFavorites(user._id, city);
      }); });
  }*/

  //getFavoriteID(userid: String, city: City): Observable<any> {
    //return this.restapi.getFavoriteID(userid, city).subscribe();
  //}

  isFavorite(city: City): boolean {  //Promise mit Async pipe
    let foundCity = this.favoriteList.find(each => each.name === city.name);
    if (foundCity) {
       return true;
    }
    else { return false; }
  }

  /*isFavorite(city: City): Promise<boolean> {  //Promise mit Async pipe
    let foundCity = this.favoriteList.find(each => each.name === city.name);
    this.favorite = new Promise<boolean>((resolve) => { setTimeout(() => { if(foundCity) { resolve(true) } else { resolve(false) } }, 1000); });
    return this.favorite;
  }*/


}
