import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

	private messageSubject = new Subject<any>();
	public message = this.messageSubject.asObservable();

  constructor() { }

  	sendMessage(message: String, typee: String) {
  		this.messageSubject.next({ text: message, type: typee });
  	}

  	clearMessage() {
  		this.messageSubject.next();
  	}
}
