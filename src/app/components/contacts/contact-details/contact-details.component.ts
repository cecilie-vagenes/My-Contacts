import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/interfaces/contact';
import { ContactForm } from 'src/app/interfaces/contact-form';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  isEdit = false;
  id: string | null = null;
  token: string = '';
  isLoading = false;
  isFetchingDataError = false;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private oidcSecurityService: OidcSecurityService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.oidcSecurityService.getAccessToken().subscribe((token: string) => this.token = token)
    );
    this.isEdit = this.route.snapshot.data['isEdit'];
    this.initializeForm();


    if (this.isEdit) {
      this.isLoading = true;
      this.getFormData();
    }
  }

  ngOnDestroy() {
    if(this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  submitForm() {
    if (!this.isEdit) {
      this.subscriptions.add(this.contactsService.createContact(this.token, this.form.value).subscribe({
        next: (response: Contact) => {
          this.toastr.success(`${response.Info.Name} was successfully created!`);
        },
        error: err => this.toastr.error(err)
      }));
    } else {
      this.subscriptions.add(this.contactsService.updateContact(this.token, this.form.value, this.id).subscribe({
        next: (response) => {
          this.toastr.success(`${response.Info.Name} was successfully updated!`);
        },
        error: err => this.toastr.error(err)
      }));
    }
  }

  private initializeForm() {
    this.form = this.fb.group({
      comment: ['', Validators.required],
      id: [''],
      info: this.fb.group({
        name: ['', Validators.required],
        id: [''],
        invoiceAddress: this.fb.group({
          addressLine1: ['', Validators.required],
          addressLine2: [''],
          postalCode: ['', Validators.required],
          city: ['', Validators.required],
          id: ['']
        }),
        defaultPhone: this.fb.group({
          number: ['', Validators.required],
          description: [''],
          id: ['']
        }),
        defaultEmail: this.fb.group({
          emailAddress: ['', Validators.required],
          id: ['']
        })
      })
    });
  }

  private getFormData() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.add(this.contactsService.getContact(this.token, this.id).subscribe({
      next: resp => {
        const contact: ContactForm = {
          comment: resp.Comment,
          id: resp.ID,
          info: {
            name: resp.Info.Name,
            id: resp.Info.ID,
            invoiceAddress: {
              addressLine1: resp.Info.InvoiceAddress.AddressLine1,
              addressLine2: resp.Info.InvoiceAddress.AddressLine2,
              postalCode: resp.Info.InvoiceAddress.PostalCode,
              city: resp.Info.InvoiceAddress.City,
              id: resp.Info.InvoiceAddress.ID
            },
            defaultPhone: {
              number: resp.Info.DefaultPhone.Number,
              description: resp.Info.DefaultPhone.Description,
              id: resp.Info.DefaultPhone.ID

            },
            defaultEmail: {
              emailAddress: resp.Info.DefaultEmail.EmailAddress,
              id: resp.Info.DefaultEmail.ID
            }
          }
        }

        this.form.patchValue(contact);
        this.isLoading = false;
        this.isFetchingDataError = false;
      },
      error: err => {
        this.toastr.error(err);
        this.isLoading = false;
        this.isFetchingDataError = true;
        this.router.navigate(['']);
      }
    }));
  }
}
