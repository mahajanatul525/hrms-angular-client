import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Employee } from '../employee/employee';
import { EmployeeinfoService } from '../../employeeinfo.service'
import { NgxSpinnerService } from "ngx-spinner";

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  employees: Employee[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      responsive: true,
      autoWidth: false,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,

      language: {
        processing: '<ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "default" color = "#fff" type = "timer" [fullScreen] = "true"><p style="color: white" > Logging you in.. Please wait </p></ngx-spinner>'},

      order: [1, 'asc'],
      columns: [
        { title:"ID",
          data: 'employeeId' },
        {
          title: "Name",
          data: 'firstName',
          render: (data, __, row) => `${row.firstName} ${row.lastName}`,
          searchable: true,
          orderable: true
        },
        {
          title: "Email",
          data: "emailAddresses",
          render: function (data, type, row) {
            var txt = '';
            data.forEach(function (item) {
              if (item.type == 'PERSONAL') {
                txt += item.address;
              }
            });
            return txt;
          }
        },
        {
          title: "Phone",
          data: "phoneNumbers",
          render: function (data, type, row) {
            var txt = '';
            data.forEach(function (item) {
              if (item.type == 'PERSONAL') {
                txt += item.number;
              }
            });
            return txt;
          }
        },
        {
          title: "Actions",
          data: 'employeeId',
          render: function (data, type, row) {

            return '<div class="btn-group">' +
              '<a  data-toggle="tooltip" data-placement="top" title="more info" data-id=' + data + ' type="button" class="btn btn-default btn-sm emp-info"><i class="icon-info icons font-xl d-block"></i></i></a>' +
              '</div>';
          }
        }

      ],
      ajax: (dataTableInput: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8084/services/employees-filtered/',
            dataTableInput, {}
          ).subscribe(resp => {

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,//[],
            });
          });
      },
    };
  }
}