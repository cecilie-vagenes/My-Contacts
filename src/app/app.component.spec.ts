import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { User } from './interfaces';

describe('AppComponent', () => {
  let oidcSecurityServiceMock = jasmine.createSpyObj('OidcSecurityService', {
    checkAuth: of(false),
  });

  @Component({
    selector: "app-navbar",
    template: "",
  })
  class MockNavbarComponent {
    @Input()
    isAuth = false;

    @Input()
    isConfigOk = false;

    @Input()
    user: User = {
      name: 'Test Name',
      email: 'test@email.com',
      companyName: 'Test company name'
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockNavbarComponent
      ],
      providers: [
        { provide: OidcSecurityService, useValue: oidcSecurityServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'My Contacts'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('My Contacts');
  });
});
