import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactListComponent } from './contact-list.component';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from 'src/app/services/contacts.service';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  const toastrServiceMock = jasmine.createSpyObj('ToastrService ', ['success', 'error']);
  const contactServiceMock = jasmine.createSpyObj('ContactsService ', ['deleteContact']);


  @Component({
    selector: "app-loading",
    template: "",
  })
  class MockLoadingComponent { }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListComponent, MockLoadingComponent ],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ContactsService, useValue: contactServiceMock }

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
