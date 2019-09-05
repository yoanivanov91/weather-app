import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../model/city';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) {
  }

//Favorites REST Services
  getFavorites(userid: String): Observable<any> {
    return this.http.get('http://localhost:3000/favorites/' + userid);
  }

  addToFavorites(city: City): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let newCity = { name: city.name, userid: city.userid };
    return this.http.post('http://localhost:3000/favorites/add', newCity, httpOptions);
  }

  getFavoriteID(userid: String, city: City): Observable<any> {
    return this.http.get<boolean>('http://localhost:3000/favorites/' + userid + '/' + city.name);
  }

  removeFromFavorites(userid: String, city: City): Observable<any> {
    return this.http.delete('http://localhost:3000/favorites/' + userid + '/' + city.name);
  }

  updateFavorite(userid: String, city: City): Observable<any> {
    return this.http.put('http://localhost:3000/favorites/' + userid + '/' + city.name, city);
  }

//Users REST Services
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }

  registerUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users/register', user);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete('http://localhost:3000/users/' + user._id );
  }
}
