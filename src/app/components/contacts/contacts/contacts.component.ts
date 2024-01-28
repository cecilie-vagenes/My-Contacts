import { Component, OnDestroy, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/interfaces';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  token: string = '';

  private subscriptions = new Subscription();

  constructor(
    private contactsService: ContactsService,
    private oidcSecurityService: OidcSecurityService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private getContacts() {
    this.subscriptions.add(this.oidcSecurityService.getAccessToken().subscribe((token: string) => {
      this.token = token;
      this.subscriptions.add(this.contactsService.getContacts(token).subscribe({
        next: contacts => this.contacts = contacts,
        error: err => this.toastr.error(err)
      }));
    }));
  }
}
