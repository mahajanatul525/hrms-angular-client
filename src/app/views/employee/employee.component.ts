import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Employee } from './employee';
import { EmployeeinfoService } from '../../employeeinfo.service'
import { NgxSpinnerService } from "ngx-spinner";
import { from, fromEvent, merge, Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { EmployeeDataSource } from './EmployeeDataSource';
import { EmployeeService } from '../../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { count, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class EmployeeComponent implements OnInit, AfterViewInit {

  employees: Employee[];
  displayedColumns = ['employeeId', 'firstName', 'lastName'];
  dataSource: EmployeeDataSource;
  length: number = 0;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 25, 50, 100];
  isvalidSearch:boolean = false;
  filtervalue: string = "";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(private employeeService: EmployeeService,    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.dataSource = new EmployeeDataSource(this.employeeService);
    this.dataSource.loadEmployees('', 'asc', 0, this.pageSize);
  }

  ngAfterViewInit(): void {

    this.dataSource.counter$
      .pipe(tap((count) => {
        this.paginator.length = count;
      })).subscribe();


      this.dataSource.loading$
      .pipe(tap((val) => {

        console.log(val);
        
        if(val == true)
          this.spinner.show();
          else
          this.spinner.hide();

      })).subscribe();

    this.paginator.page
      .pipe(tap(() =>
        this.loadEmployeesPage())).subscribe();

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                  
                  const ip = this.input.nativeElement.value.trim();
                  this.filtervalue = ip === null ? '' : ip;

                  if((ip == '' && this.isvalidSearch) || (ip !='')){
                      this.isvalidSearch = ip != '';
                      this.paginator.pageIndex = 0;
                      this.loadEmployeesPage();
                  }
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadEmployeesPage())
        )
        .subscribe();
  }


  loadEmployeesPage() {
    this.dataSource.loadEmployees(
      this.filtervalue,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}