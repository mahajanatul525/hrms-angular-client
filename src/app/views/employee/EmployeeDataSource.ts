import { DataSource } from '@angular/cdk/table';
import { Employee } from './employee';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import {EmployeeService} from '../../services/employee.service';


export class EmployeeDataSource implements DataSource<Employee> {

    private employeeSubject = new BehaviorSubject<Employee[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();


    constructor(private employeeService: EmployeeService) { }

    connect(collectionViewer: CollectionViewer): Observable<Employee[] | readonly Employee[]> {
       return this.employeeSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.employeeSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadEmployees(filter = '', sortDirection ='asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);
        
        this.employeeService.findEmployees(filter,sortDirection,pageIndex,pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: any) => {
                this.employeeSubject.next(result.content);
                this.countSubject.next(result.totalElements);
            }
            );
    }
}
