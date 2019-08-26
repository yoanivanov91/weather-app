import { Component, OnInit, Input } from '@angular/core';
import { WeatherSearchComponent } from '../weather-search/weather-search.component';
import { City } from '../model/city';
import { FavoriteService } from '../services/favorite.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-show',
  templateUrl: './weather-show.component.html',
  styleUrls: ['./weather-show.component.css']
})
export class WeatherShowComponent implements OnInit {

  @Input() public weatherData;
  @Input() public submitted;
  @Input() public weatherForm;
  @Input() public city: City;
  @Input() public errmsg;
  public favoriteData: any;
  public favoriteList: City[];

  constructor(private favoriteservice: FavoriteService) {
  }


  ngOnInit() {
    this.favoriteservice.getFavorites().subscribe(data => { this.favoriteData = data;
                     this.favoriteList = this.favoriteData});
  }

  addFavorite(city: City) {
    this.favoriteservice.addToFavorites(city).subscribe(() => this.favoriteservice.getFavorites().subscribe(data => { this.favoriteData = data;
                     this.favoriteList = this.favoriteData}));
  }

  removeFavorite(city: City) {
    this.favoriteservice.removeFromFavorites(city).subscribe(() => this.favoriteservice.getFavorites().subscribe(data => { this.favoriteData = data;
                     this.favoriteList = this.favoriteData}));
  }

  isFavorite(city: City): boolean {
    let foundCity = this.favoriteList.find(each => each.name === city.name);
    if (foundCity) {
       return true;
    }
    else { return false; }
  }

}
