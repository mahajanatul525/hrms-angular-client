import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConfigurationService } from '../../../services/configuration.service';
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
  genders = ['Male', 'Female', 'Other'];
  saluatations = ['Mr', 'Mrs', 'Miss'];
  maritalStatus = ['Single', 'Married', 'Divorced', 'Widowed'];
  emailTypes = ['Personal','Work'];
  phoneType =['Mobile','Work','Home','other'];
  addressType=['Permanent','Present','Work'];
  submitted = false;

  employee = new Employee();

  allowUserToAddAnotherEmail: Boolean;
  allowUserToAddAnotherPhone: Boolean;
  allowUserToAddAnotherAddress: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService) {

     this.allowUserToAddAnotherEmail = this.configurationService.getValue('allowUserToAddAnotherEmail', false);
     this.allowUserToAddAnotherPhone = this.configurationService.getValue('allowUserToAddAnotherEmail', false);
     this.allowUserToAddAnotherAddress = this.configurationService.getValue('allowUserToAddAnotherEmail', false);

    }

  ngOnInit() {

    this.employee.salutation = this.saluatations[0];
    this.employee.gender = this.genders[0];
    this.employee.maritalStatus = this.maritalStatus[0];

    this.form = this.formBuilder.group(new EmployeeForm(this.employee));

    this.addAddress(this.addressType[0],false);
    this.addPhone(this.phoneType[0],false);
    this.addEmail(this.emailTypes[0],false);

    this.form.valueChanges.subscribe(value => {
      console.log(JSON.stringify(value));
    });

  }

  get Addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addAddress(type:string,isRemoveable: boolean = true) {
    (this.form.get('addresses') as FormArray).push(
      this.formBuilder.group(new AddressForm(new Address(type,isRemoveable)))
    )
  }

  removeAddress(index: number) {
    (this.form.get('addresses') as FormArray).removeAt(index)
  }

  get emailAddresses():FormArray {
    return this.form.get('emails') as FormArray;
  } 

  addEmail(type:string, removeble:Boolean = true){
    this.emailAddresses.push(this.formBuilder.group(new EmailForm(new EmailAddress(type,removeble))));
  }

  removeEmail(index: number){
    this.emailAddresses.removeAt(index);
  }

  get phoneNumbers():FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }
  
  addPhone(type:string, removeble:Boolean = true){
    this.phoneNumbers.push(
      this.formBuilder.group(new PhoneForm(new PhoneNumber(type,removeble)))
    );
  }

  removePhone(index:number){
    this.phoneNumbers.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
  }
}
