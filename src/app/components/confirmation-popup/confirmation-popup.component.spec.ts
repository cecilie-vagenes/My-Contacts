import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfirmationPopupComponent } from './confirmation-popup.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmationPopupComponent', () => {
  let component: ConfirmationPopupComponent;
  let fixture: ComponentFixture<ConfirmationPopupComponent>;

  const dialogMock = {
    close: () => {}
   };

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationPopupComponent ],
      imports: [MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        {provide: MAT_DIALOG_DATA, useValue:  []}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
