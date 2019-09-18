import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from '../../../others/model/city';
import { FavoriteService } from '../../../services/services/favorite.service';
import { AuthenticationService } from '../../../services/services/authentication.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit, OnDestroy {

  public currentUser: any;


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
    if(this.favoriteList().length > 0) {
      document.getElementById('0').classList.add('active');
    }
    /*if(element) {
      element.classList.add('active');
    }
    else { 
      let element2 = document.getElementById('1');
      if(element2) {
        element2.classList.add('active');
      }
    }*/
    this.favoriteservice.removeFromFavorites(this.currentUser._id, city);
  }

  isFavorite(city: City): boolean {
    return this.favoriteservice.isFavorite(city);
  }

  ngOnDestroy() {
    this.favoriteservice.emptyFavoriteList();
  }
}
