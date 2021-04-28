import { Component, OnInit } from '@angular/core';
import { EmployeeinfoService } from '../../employeeinfo.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  products = [];
  constructor(private employeeService:EmployeeinfoService) {

   }

  ngOnInit() {

    this.employeeService.get().subscribe((data:any[])=>{
      console.log(data);
      this.products = data;
    })
  }

}