import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../../others/model/city';
import { User } from '../../others/model/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) {
  }

//Favorites REST Services
  getFavorites(userid: String): Observable<any> {
    return this.http.get(environment.BackendURL + 'favorites/' + userid);
  }

  addToFavorites(city: City): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let newCity = { name: city.name, userid: city.userid };
    return this.http.post(environment.BackendURL + 'favorites/add', newCity, httpOptions);
  }

  getFavoriteID(userid: String, city: City): Observable<any> {
    return this.http.get<boolean>(environment.BackendURL + 'favorites/' + userid + '/' + city.name);
  }

  removeFromFavorites(userid: String, city: City): Observable<any> {
    return this.http.delete(environment.BackendURL + 'favorites/' + userid + '/' + city.name);
  }

  updateFavorite(userid: String, city: City): Observable<any> {
    return this.http.put(environment.BackendURL + 'favorites/' + userid + '/' + city.name, city);
  }

//Users REST Services
  getUsers(): Observable<any> {
    return this.http.get(environment.BackendURL + 'users');
  }

  getUserById(id: String): Observable<any> {
    return this.http.get(environment.BackendURL + 'users/' + id);
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(environment.BackendURL + 'users/register', user);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(environment.BackendURL + 'users/' + user._id );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(environment.BackendURL + 'users/' + user._id, user);
  }
}
