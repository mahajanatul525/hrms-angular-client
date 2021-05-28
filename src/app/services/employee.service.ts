import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../views/employee/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }

  findEmployees(
    filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 10) {

    const endpoint = 'http://localhost:8084/services/employees-page/';

    return this.http.get(endpoint, {
      params: new HttpParams()
        .set('filter', filter)
        //.set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(

    );
  }
}
