import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  
  constructor(private http: HttpClient) { }

  findEmployees(
    filter = '', sortBy = '',sortOrder = 'asc',
    pageNumber = 0, pageSize = 10) {

      sortBy = 'firstName';

    return this.http.get(environment.endpoint_EmployeesBypage, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(

    );
  }
}
