import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { ContactsService } from 'src/app/services/contacts.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { Contact } from 'src/app/interfaces';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  const oidSecurityServiceMock = jasmine.createSpyObj('OidcSecurityService', {
    getAccessToken: of('this-is-a-token')
  });
  const contactsServiceMock = jasmine.createSpyObj('ContactsService', ['getContacts']);
  
  const toastrServiceMock = jasmine.createSpyObj('ToastrService ', ['success', 'error']);


  @Component({
    selector: "app-contact-list",
    template: "",
  })
  class MockContactListComponent {
    @Input()
    contacts: Contact[] = [];

    @Input()
    token = 'test-token';
  }
  
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsComponent, MockContactListComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ContactsService, useValue: contactsServiceMock },
        { provide: OidcSecurityService, useValue: oidSecurityServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
