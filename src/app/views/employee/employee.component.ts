import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { from, fromEvent, merge, Subject } from 'rxjs';
import { EmployeeDataSource } from './EmployeeDataSource';
import { EmployeeService } from '../../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { count, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class EmployeeComponent implements OnInit, AfterViewInit {

  displayedColumns = ['employeeId', 'name', 'email','phone','department','actions'];
  dataSource: EmployeeDataSource;
  dataSourceDummy: MatTableDataSource<any>;
  length: number = 0;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 25, 50, 100];
  isvalidSearch: boolean = false;
  filtervalue: string = "";
  loadcomplete: Boolean = false;
  activeSortCol:String = "";


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(private employeeService: EmployeeService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.sort.sort(({id:'name',start:'asc'}) as MatSortable);
    this.dataSource = new EmployeeDataSource(this.employeeService);
    this.dataSource.loadEmployees('',this.sort.active,'asc', 0, this.pageSize);
  }

  ngAfterViewInit(): void {

    this.dataSource.counter$
      .pipe(tap((count) => {
        this.length = count;
        this.paginator.length = count;
      })).subscribe();


    this.dataSource.loading$
      .pipe(tap((val) => {

        if (val == true){
          this.loadcomplete = false;
          this.spinner.show();
        }
        else{
          this.spinner.hide();
          this.loadcomplete = true;
        }
          

      })).subscribe();

    this.paginator.page
      .pipe(tap(() =>
        this.loadEmployeesPage())).subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {

          const ip = this.input.nativeElement.value.trim();
          this.filtervalue = ip === null ? '' : ip;

          if ((ip == '' && this.isvalidSearch) || (ip != '')) {
            this.isvalidSearch = ip != '';
            this.paginator.pageIndex = 0;
            this.loadEmployeesPage();
          }
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          
          this.loadEmployeesPage();
        })
      )
      .subscribe();
  }


  loadEmployeesPage() {
    console.log("active col " + this.sort.active  );

    this.dataSource.loadEmployees(
      this.filtervalue,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}