import { Component, OnInit } from '@angular/core';
import { City } from '../model/city';
import { FavoriteService } from '../services/favorite.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

	public favoriteData: any;
	public favoriteList: City[];

  constructor(private favoriteservice: FavoriteService) { }

  ngOnInit() {
  	this.favoriteservice.getFavorites().subscribe(data => { this.favoriteData = data;
  									 this.favoriteList = this.favoriteData});
  }

  addFavorite(city: City) {
  	this.favoriteservice.addToFavorites(city).subscribe();
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
