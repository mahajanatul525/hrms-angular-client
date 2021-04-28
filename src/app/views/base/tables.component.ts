import { Component, OnInit } from '@angular/core';
import {EmployeeinfoService} from '../../employeeinfo.service';

@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit {

  products = [];
	constructor(private apiService: EmployeeinfoService) { }
	ngOnInit() {
		this.apiService.get().subscribe((data: any[])=>{  
			console.log(data);  
			this.products = data;  
		})  
	}

}
