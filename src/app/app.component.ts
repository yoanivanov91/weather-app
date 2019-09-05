import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { AuthenticationService } from './others/services/authentication.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	public currentUser: any;

  public constructor(private titleService: Title, 
  		private router: Router,
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService) {
  		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/users']);
  }
}
