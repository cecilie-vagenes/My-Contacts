import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from 'src/app/services/contacts.service';
import { ConfirmationPopupComponent } from '../../confirmation-popup/confirmation-popup.component';
import { Contact } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnChanges, OnDestroy {
  @Input()
  contacts: Contact[] = [];

  @Input()
  token: string = '';

  filteredContacts: Contact[] = [];
  isLoading = true;

  private subscriptions = new Subscription();

  constructor(
    private contactsService: ContactsService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const { contacts } = changes;
    
    if (contacts.previousValue !== undefined) {
      this.isLoading = false;
      this.filteredContacts = this.contacts;
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  deleteContact(data: { name: string, id: number }) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      maxWidth: "400px",
      data: { name: data.name }
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.subscriptions.add(this.contactsService.deleteContact(this.token, data.id).subscribe({
          next: () => {
            this.filteredContacts = this.contacts.filter(x => x.ID !== data.id);
            const name = this.contacts.find(contact => contact.ID === data.id)?.Info.Name;
            this.toastr.success(`${name} was successfully deleted`);
          },
          error: err => this.toastr.error(err)
        }));
      }
    }));
  }

  sortAscendingByName(isAsc: boolean) {
    isAsc
      ? this.filteredContacts.sort((a, b) => a.Info.Name.localeCompare(b.Info.Name))
      : this.filteredContacts.sort((a, b) => b.Info.Name.localeCompare(a.Info.Name))
  }

  onKey(e: KeyboardEvent) {
    const searchValue = (e.target as HTMLInputElement).value;
    this.filteredContacts = this.contacts.filter(
      contact => contact.Info.Name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
