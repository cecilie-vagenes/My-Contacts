// Angular + 3rd party libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environments';

// Components
import { AppComponent } from './app.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { ContactDetailsComponent } from './components/contacts/contact-details/contact-details.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { ContactListItemComponent } from './components/contacts/contact-list-item/contact-list-item.component';
import { ContactsComponent } from './components/contacts/contacts/contacts.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactsService } from './services/contacts.service';

@NgModule({  
  declarations: [
    AppComponent,
    ConfirmationPopupComponent,
    ContactDetailsComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactsComponent,
    LoadingComponent,
    NavbarComponent,
  ],
  imports: [
    AuthModule.forRoot({
      config: {
        authority: environment.authority,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: environment.client_id,
        scope: environment.scope,
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        silentRenewUrl: `${window.location.origin}/silent-renew.html`,
        logLevel: LogLevel.Debug,
      },
    }),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
