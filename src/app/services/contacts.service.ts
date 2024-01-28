import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { Contact } from '../interfaces/contact';

@Injectable()
export class ContactsService {
  private baseUrl = environment.base_url;
  private apiUrl = `${this.baseUrl}/biz/contacts`;
  private queries = '?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false'

  constructor(private http: HttpClient) { }

  getContacts(token: string): Observable<Contact[]> {
    const httpOptions = this.getHttpOptions(token);
    const url = `${this.apiUrl + this.queries}`;

    return this.http.get<Contact[]>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getContact(token: string, id: string | null): Observable<Contact> {
    const httpOptions = this.getHttpOptions(token);
    const url = `${this.apiUrl}/${id}${this.queries}`;

    return this.http.get<Contact>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createContact(token: string, body: Contact): Observable<Contact> {
    const httpOptions = this.getHttpOptions(token);

    return this.http.post<Contact>(`${this.baseUrl}/biz/contacts`, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateContact(token: string, body: Contact, id: string | null): Observable<Contact> {
    const httpOptions = this.getHttpOptions(token);

    return this.http.put<Contact>(`${this.baseUrl}/biz/contacts/${id}`, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteContact(token: string, id: number) {
    const httpOptions = this.getHttpOptions(token);

    return this.http.delete(`${this.baseUrl}/biz/contacts/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.status + ' ' + err.message;
    } else {
      errorMessage = err.status + ' ' + err.message;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

  private getHttpOptions(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return httpOptions;
  }
}
