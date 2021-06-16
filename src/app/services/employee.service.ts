import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Employee } from '../views/employee/employee.model';

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

  AddEmployee(employee:Employee): Observable<any> {
    const emp = new Employee();
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(employee);
    console.log(body)
    return this.http.post(environment.endpoint_AddEmployee, employee,{'headers':headers})


    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   })
    // };
  
    // return this.http.post<any[]>(environment.endpoint_AddEmployee, employee, httpOptions)
    //   .pipe(
       
    //   );
  }
  

}
