import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../others/model/city';
import { FavoriteService } from '../../services/services/favorite.service';
import { AuthenticationService } from '../../services/services/authentication.service';

@Component({
  selector: 'app-weather-show',
  templateUrl: './weather-show.component.html',
  styleUrls: ['./weather-show.component.css']
})
export class WeatherShowComponent implements OnInit {

  @Input() public city: City;
  public currentUser: any;

  constructor(private favoriteservice: FavoriteService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  addFavorite(city: City) {
    this.favoriteservice.addToFavorites(city);
  }

  removeFavorite(city: City) {
    this.favoriteservice.removeFromFavorites(this.currentUser._id, city);
  }

  isFavorite(city: City): boolean {
    return this.favoriteservice.isFavorite(city);
  }

}
