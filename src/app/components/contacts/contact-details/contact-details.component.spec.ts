import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactsService } from 'src/app/services/contacts.service';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

  let oidcSecurityServiceMock = jasmine.createSpyObj('OidcSecurityService', {
    getAccessToken: of('this-is-a-token'),
  });

  const contactServiceMock = jasmine.createSpyObj('ContactsService ', ['getContact' ,'createContact', 'updateContact']);
  let toastrServiceMock = jasmine.createSpyObj('ToastrService ', ['success', 'error']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: OidcSecurityService, useValue: oidcSecurityServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ContactsService, useValue: contactServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
