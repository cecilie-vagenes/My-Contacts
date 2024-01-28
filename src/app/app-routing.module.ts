import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './components/contacts/contact-details/contact-details.component';
import { ContactsComponent } from './components/contacts/contacts/contacts.component';

const routes: Routes = [
  {
    path: 'contacts/create',  
    component: ContactDetailsComponent,
    data: {"isEdit": false}
  },
  {
    path: 'contacts/:id',  
    component: ContactDetailsComponent,
    data: {"isEdit": true}

  },
  {
    path: '',
    component: ContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
