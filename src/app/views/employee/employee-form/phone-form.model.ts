import { FormControl } from "@angular/forms";
import { Address, PhoneNumber } from "../employee.model";



export class PhoneForm {
    id = new FormControl();
    type = new FormControl();
    number = new FormControl();
    isRemoveble:Boolean;

    constructor(phone: PhoneNumber) {
        
        this.isRemoveble = phone.isRemoveable;
        this.id.setValue(phone.id ? phone.id : '');
        this.type.setValue(phone.type ? phone.type : '');
        this.number.setValue(phone.number ? phone.number : '');
    }
}