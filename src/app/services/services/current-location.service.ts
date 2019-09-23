import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

	@Output() clicked: EventEmitter<String> = new EventEmitter();

  	constructor() { }

 	emitCityName(cityname: String) {
    	this.clicked.emit(cityname);
  	}
}
