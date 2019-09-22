import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit, OnChanges {

	@Input() public header;
	@Input() public message;
	public createdOn;
  	constructor() { 
  		this.createdOn = new Date().getTime();
  	}

  	ngOnInit() {
  		this.timer();
  	}

  	ngOnChanges() {
  		this.createdOn = new Date().getTime();
  	}

  	timer() {
  		setInterval(() => {
  		let now = new Date().getTime();
  		let distance = 1000 + now - this.createdOn; // +1 second
  		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  		document.getElementById("timer").innerHTML = seconds + " seconds ago" }, 500);
  	}

}
