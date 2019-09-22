import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute
} from '@angular/router'
//import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { AuthenticationService } from './services/services/authentication.service';
import { filter, map } from 'rxjs/operators';
import { fader } from './app-routes-animations';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ fader ]
})
export class AppComponent implements OnInit {

	public currentUser: any;
  public showLoadingScreen = true;

  public constructor(private titleService: Title, 
  		private router: Router,
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService) {
  		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
      });
  }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showLoadingScreen = true;
    }
    if (event instanceof NavigationEnd) {
      this.showLoadingScreen = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showLoadingScreen = false;
    }
    if (event instanceof NavigationError) {
      this.showLoadingScreen = false;
    }
  }

  navbarClose() {
     $('.navbar-collapse').collapse('hide');
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  isAdmin(): boolean {
    if(this.currentUser.role === 'Admin') { return true }
    else { return false }
    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
