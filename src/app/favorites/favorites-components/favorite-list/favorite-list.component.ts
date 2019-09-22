import { Component, OnInit, OnChanges } from '@angular/core';
import { City } from '../../../others/model/city';
import { FavoriteService } from '../../../services/services/favorite.service';
import { AuthenticationService } from '../../../services/services/authentication.service';
declare const $: any;

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit, OnChanges {

  public currentUser: any;
  public currentCity: any;


  constructor(private favoriteservice: FavoriteService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.favoriteservice.getFavorites();
  }

  ngOnInit() {
  }

  favoriteList() {
    return this.favoriteservice.getFavoriteList();
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

  slideTo(i) {
    $('.carousel').carousel(i);
  }

  ngOnChanges() {
    //this.favoriteservice.getFavoriteList();
  }
}
