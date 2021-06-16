import { FormArray, FormControl } from "@angular/forms";
import { Employee } from "../employee.model";


export class EmployeeForm {
    employeeId = new FormControl();
    firstName = new FormControl()
    middleName = new FormControl()
    lastName = new FormControl()
    salutation = new FormControl()
    birthDate = new FormControl()
    gender = new FormControl()
    maritalStatus = new FormControl()
    createdAt = new FormControl()
    updatedAt = new FormControl()

    emailAddresses = new FormArray([]);
    phoneNumbers = new FormArray([]);
    addresses = new FormArray([]);

    constructor(employee: Employee)
    {
        if(employee.employeeId){
            this.employeeId.setValue(employee.employeeId);
        }

        if(employee.salutation){
            this.salutation.setValue(employee.salutation);
        }

        if(employee.firstName){
            this.firstName.setValue(employee.firstName);
        }

        if(employee.lastName){
            this.lastName.setValue(employee.lastName);
        }

        if(employee.middleName){
            this.middleName.setValue(employee.middleName);
        }

        if(employee.birthDate){
            this.birthDate.setValue(employee.salutation);
        }

        if(employee.gender){
            this.gender.setValue(employee.gender);
        }

        if(employee.maritalStatus){
            this.maritalStatus.setValue(employee.maritalStatus);
        }

        if(employee.gender){
            this.gender.setValue(employee.gender);
        }
        if(employee.createdAt){
            this.createdAt.setValue(employee.createdAt);
        }
        if(employee.updatedAt){
            this.updatedAt.setValue(employee.updatedAt);
        }
    }
}