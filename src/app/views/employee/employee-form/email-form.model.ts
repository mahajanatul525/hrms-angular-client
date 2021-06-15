import { FormControl } from "@angular/forms";
import { Address, EmailAddress, PhoneNumber } from "../employee.model";



export class EmailForm {
    id = new FormControl();
    type = new FormControl();
    address = new FormControl();
    isRemoveble:Boolean;

    constructor(email: EmailAddress) {
        
        this.isRemoveble = email.isRemoveable;
        this.id.setValue(email.id ? email.id : '');
        this.type.setValue(email.type ? email.type : '');
        this.address.setValue(email.address ? email.address : '');
    }
}