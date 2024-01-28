import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListItemComponent } from './contact-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Contact } from 'src/app/interfaces';

describe('ContactListItemComponent', () => {
  let component: ContactListItemComponent;
  let fixture: ComponentFixture<ContactListItemComponent>;

  const contactMock: Contact = {
    ID: 1,
    InfoID: 3,
    Info: {
      ID: 3,
      Name: 'Test Name',
      InvoiceAddress: {
        ID: 2,
        AddressLine1: 'test',
        AddressLine2: 'gaten',
        City: 'Bergen',
        PostalCode: '4433'
      },
      DefaultPhone: {
        ID: 4,
        Description: 'desc',
        Number: '3333333'
      },
      DefaultEmail: {
        ID: 5,
        EmailAddress: 'test@email.com'
      }
    },
    Comment: 'test comment',
    Role: 'Role'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactListItemComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ContactListItemComponent);
    component = fixture.componentInstance;
    component.contact = contactMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
