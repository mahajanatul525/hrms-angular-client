import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConfigurationService } from '../../../services/configuration.service';
import { EmployeeService } from '../../../services/employee.service';
import { AddressForm } from '../address-form/address-form.model';
import { Address, EmailAddress, Employee, PhoneNumber } from '../employee.model';
import { EmailForm } from './email-form.model';
import { EmployeeForm } from './employee-form-model';
import { PhoneForm } from './phone-form.model';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  form!: FormGroup;
  genders = ['MALE', 'FEMALE', 'OTHER'];
  saluatations = ['Mr', 'Mrs', 'Miss'];
  maritalStatus = ['Single', 'Married', 'Divorced', 'Widowed'];
  emailTypes = ['PERSONAL','Work'];
  phoneType =['PERSONAL','Work','Home','other'];
  addressType=['PERMANENT','Present','Work'];
  submitted = false;

  employee = new Employee();
  email = new EmailAddress(this.emailTypes[0]);
  phone = new PhoneNumber(this.phoneType[0]);
  address = new Address(this.addressType[0]);

  allowUserToAddAnotherEmail: Boolean;
  allowUserToAddAnotherPhone: Boolean;
  allowUserToAddAnotherAddress: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private employeeservice:EmployeeService) {

     this.allowUserToAddAnotherEmail = this.configurationService.getValue('allowUserToAddAnotherEmail', false);
     this.allowUserToAddAnotherPhone = this.configurationService.getValue('allowUserToAddAnotherEmail', false);
     this.allowUserToAddAnotherAddress = this.configurationService.getValue('allowUserToAddAnotherEmail', false);

    }

  ngOnInit() {

    this.employee.salutation = this.saluatations[0];
    this.employee.gender = this.genders[0];
    this.employee.maritalStatus = this.maritalStatus[0];
    this.employee.firstName = "Atul";
    this.employee.lastName = "Mahajan";
    this.employee.middleName = "Arun";



    this.address.line1 = 'flat no 203';
    this.address.line2 = 'test';
    this.address.locality = 'flat no 203';
    this.address.district = 'Jalgaon';
    this.address.state = 'Maharashtra';
    this.address.country = 'INdia';
    this.address.zipCode = '425001';

    this.employee.addresses = [this.address];

    this.phone.number = '9404424445';
    
    this.employee.phoneNumbers = [this.phone];

    this.email.address = 'mahajanatul525@gmail.com';

    this.employee.addresses = [this.address];
    





    
    

    this.form = this.formBuilder.group(new EmployeeForm(this.employee));

    this.addAddress(this.addressType[0],false);
    this.addPhone(this.phoneType[0],false);
    this.addEmail(this.emailTypes[0],false);

    this.form.valueChanges.subscribe(value => {
    
    });

  }

  get Addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addAddress(type:string,isRemoveable: boolean = true) {
    (this.form.get('addresses') as FormArray).push(
      this.formBuilder.group(new AddressForm(this.address))
    )
  }

  removeAddress(index: number) {
    (this.form.get('addresses') as FormArray).removeAt(index)
  }

  get emailAddresses():FormArray {
    return this.form.get('emailAddresses') as FormArray;
  } 

  addEmail(type:string, removeble:Boolean = true){
    this.emailAddresses.push(this.formBuilder.group(new EmailForm(this.email)));
  }

  removeEmail(index: number){
    this.emailAddresses.removeAt(index);
  }

  get phoneNumbers():FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }
  
  addPhone(type:string, removeble:Boolean = true){
    this.phoneNumbers.push(
      this.formBuilder.group(new PhoneForm(this.phone))
    );
  }

  removePhone(index:number){
    this.phoneNumbers.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;

    //this.employee = this.form.value;
    console.log(this.form.value);

     //this.employee = (this.form.value) as Employee;

     alert(this.employee);

    // var objectMapper = require('object-mapper');

    // var dest = objectMapper(this.form.value, this.employee);
 

this.employee = this.form.value as Employee;


    this.employeeservice.AddEmployee(this.employee).subscribe(data =>{
      console.log("responce" + data);
    })


  }
}
