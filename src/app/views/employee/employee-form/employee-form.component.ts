import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddressForm } from '../address-form/address-form.model';
import { Address, EmailAddress, Employee } from '../employee.model';
import { EmployeeForm } from './employee-form-model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  form!: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  saluatations = ['Mr', 'Mrs', 'Miss'];
  maritalStatus = ['Single', 'Married', 'Divorced','Widowed'];
  submitted = false;
  employee = new Employee();
  //address = new Address();

  allowUsertoAddEmail:Boolean = true;
  allowUsertoAddPhone:Boolean = true;
  allowUsertoAddAddress:Boolean = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.employee.salutation = this.saluatations[0];
    this.employee.gender = this.genders[0];
    this.employee.maritalStatus = this.maritalStatus[0];

    //this.address.addressType = "Permanent";


    this.form = this.formBuilder.group(new EmployeeForm(this.employee));

    this.addAddress(false);
    this.addAddress();
    
    this.form.valueChanges.subscribe(value => {
      console.log(JSON.stringify(value));
    });

  }


  get Addresses():FormArray {
    return this.form.get('addresses') as FormArray; 
  }

  addAddress(isRemoveable:boolean = true) {
    (this.form.get('addresses') as FormArray).push(
      this.formBuilder.group(new AddressForm(new Address(isRemoveable)))
    )
  }

  onSubmit() {
    this.submitted = true;
  }
  removeAddress(index: number) {
    (this.form.get('addresses') as FormArray).removeAt(
     index
    )
  }

}
