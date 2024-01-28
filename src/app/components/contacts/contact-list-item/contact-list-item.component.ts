import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent {
  @Input()
  contact: Contact = {} as Contact;

  @Output()
  delete = new EventEmitter<{ name: string, id: number }>();

  deleteContact() {
    const payload = {
      name: this.contact.Info.Name,
      id: this.contact.ID
    }
    this.delete.emit(payload);
  }
}