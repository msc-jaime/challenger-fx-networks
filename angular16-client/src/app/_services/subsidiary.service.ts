import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Subsidiary, Subsidiaries } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class SubsidiaryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Subsidiaries>(`${environment.apiUrl2}/subsidiarias`)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  create(employee: Subsidiary): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl2}/subsidiarias`, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl2}/subsidiarias/${id}`)
      .pipe(
        catchError(this.errorHandler)
      )
  } 

  update(id: number, employee: Subsidiary): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl2}/subsidiarias/${id}`, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl2}/subsidiarias/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
