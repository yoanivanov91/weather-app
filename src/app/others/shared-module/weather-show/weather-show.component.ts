import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../../others/model/city';
import { FavoriteService } from '../../../services/services/favorite.service';
import { AuthenticationService } from '../../../services/services/authentication.service';
declare const require: any;
declare const $: any;

@Component({
  selector: 'app-weather-show',
  templateUrl: './weather-show.component.html',
  styleUrls: ['./weather-show.component.css']
})
export class WeatherShowComponent implements OnInit {

  @Input() public city: City;
  public currentUser: any;
  public tempSrc = require('../../../images/icons/best/temp.png');
  public humiditySrc = require('../../../images/icons/best/humidity.png');
  public windSrc = require('../../../images/icons/best/wind.png');
  public header: String;
  public message: String;

  constructor(private favoriteservice: FavoriteService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  addFavorite(city: City) {
    this.favoriteservice.addToFavorites(city);
    this.message = city.name + " was successfully added to favorites";
    this.header = "Notification";
    setTimeout(() => $('.toast').toast('show'), 300);
  }

  removeFavorite(city: City) {
    this.favoriteservice.removeFromFavorites(this.currentUser._id, city);
    this.message = city.name + " was successfully removed from favorites";
    this.header = "Notification";
    setTimeout(() => $('.toast').toast('show'), 300);
  }

  isFavorite(city: City): boolean {
    return this.favoriteservice.isFavorite(city);
  }

}
