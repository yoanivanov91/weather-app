import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../../services/services/alert.service';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy {

	public message: String = null;
	public type: String = null;
  //public subscription: Subscription;

  constructor(private alertService: AlertService) { 
  	this.alertService.message.subscribe(message => { 
      if(message) { this.message = message.text; this.type = message.type; }
      else { this.message = null; this.type = null; } });
  }

  addClass() {
  	switch (this.type) {
  		case 'error':
  			return 'alert alert-danger';
  			break;

  		case 'success':
  			return 'alert alert-success';
  			break;

      case 'normal':
        break;
  		
  		default:
  			// code...
  			break;
  	}
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

}
