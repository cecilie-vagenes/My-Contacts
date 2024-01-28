import { Component, OnDestroy, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../environments/environments';
import { User } from './interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'My Contacts';
  user: User = {}  as User;
  isAuth = false;
  isConfigOk = false;
  
  private subscriptions = new Subscription();

  constructor(private oidcSecurityService: OidcSecurityService){}

  ngOnInit() {
    if(environment.client_id.length > 10){
      this.isConfigOk = true;
    }
    this.subscriptions.add(this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      if(isAuthenticated){
        this.isAuth = true;
        this.user = {
          name: userData.name,
          email: userData.email,
          companyName: userData.companyName
        };
      } 
    }));
  }

  ngOnDestroy() {
    if(this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  logInOrOut(login: boolean) {
    login 
    ? this.oidcSecurityService.authorize() 
    : this.subscriptions.add(this.oidcSecurityService.logoff().subscribe());
  }
}
