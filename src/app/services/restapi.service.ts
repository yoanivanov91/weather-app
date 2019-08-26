import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { City } from '../model/city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) {
  }

  getFavorites(): Observable<any> {
    return this.http.get('http://localhost:3000/api/favorites');
  }

  addToFavorites(city: City): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/api/favorites', city, httpOptions);
  }

  findFavorite(city: City): Observable<any> {
    return this.http.get<boolean>('http://localhost:3000/api/favorites/' + city.name);
  }

  removeFromFavorites(city: City): Observable<any> {
    return this.http.delete('http://localhost:3000/api/favorites/' + city.name);
  }
}
