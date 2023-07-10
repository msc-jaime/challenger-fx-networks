import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Employee, Employees } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class EmployeeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Employees>(`${environment.apiUrl2}/empleados`)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  create(employee: Employee): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl2}/empleados`, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl2}/empleados/${id}`)
      .pipe(
        catchError(this.errorHandler)
      )
  } 

  update(id: string, employee: Employee): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl2}/empleados/${id}`, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl2}/empleados/${id}`, this.httpOptions)
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
