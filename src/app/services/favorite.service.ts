import { Injectable } from '@angular/core';
import { City } from '../model/city'
import { FavoriteListComponent } from '../favorite-list/favorite-list.component'
import { RestApiService } from './restapi.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private restapi: RestApiService) {
  }

  getFavorites(): Observable<any> {
    return this.restapi.getFavorites();
    // return this.favoriteList;
  }

  addToFavorites(city: City): Observable<any> {
    return this.restapi.addToFavorites(city);
    // this.favoriteList.push(city);
  }

  removeFromFavorites(city: City): Observable<any> {
    return this.restapi.removeFromFavorites(city);
    // let index = this.favoriteList.findIndex(x => x.name === city.name);
    // if (index > -1) {
    // this.favoriteList.splice(index, 1);
    // console.log("Successfully removed" + city.name + "from favorites");
    // }
  }

  findFavorite(city: City): Observable<any> {
    return this.restapi.findFavorite(city);
  }

}
