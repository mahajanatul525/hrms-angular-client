import { FormControl } from "@angular/forms";
import { Address } from "../employee.model";

export class AddressForm {
    addressId = new FormControl();
    ordinal = new FormControl();
    line1 = new FormControl();
    line2 = new FormControl();
    landMark = new FormControl();
    locality = new FormControl();
    zipCode = new FormControl();
    district = new FormControl();
    state = new FormControl();
    country = new FormControl();
    addressType = new FormControl();

    constructor(address: Address) {
        if (address.addressId) 
            this.addressId.setValue(address.addressId);

        if (address.ordinal) 
            this.ordinal.setValue(address.ordinal);

        if (address.line1) 
            this.line1.setValue(address.line1);

        if (address.line2) 
            this.line2.setValue(address.line2);

        if (address.landMark) 
            this.landMark.setValue(address.landMark);

        if (address.locality) 
            this.locality.setValue(address.locality);

        if (address.zipCode) 
            this.zipCode.setValue(address.zipCode);

        if (address.state) 
            this.state.setValue(address.state);

        if (address.country) 
            this.country.setValue(address.country);

        if (address.district) 
            this.district.setValue(address.district);

        if (address.addressType) 
            this.addressType.setValue(address.addressType);
    }
}