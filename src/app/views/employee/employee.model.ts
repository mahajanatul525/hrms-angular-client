
export class EmailAddress {
    id: number;
    type: string;
    address: string;
    isRemoveable:Boolean;

    constructor(type:string, isRemoveable:Boolean = false){
        this.type =type;
        this.isRemoveable = isRemoveable;
    }
}

export class PhoneNumber {
    id: number;
    number: string;
    type: string;
    isRemoveable:Boolean;

    constructor(type:string, isRemoveable:Boolean = false){
        this.type =type;
        this.isRemoveable = isRemoveable;
    }
}

export class Address {
    addressId: number;
    ordinal: number;
    line1: string;
    line2: string;
    landMark: string;
    locality: string;
    zipCode: string;
    district: string;
    state: string;
    country: string;
    addressType: string;
    isRemoveble:boolean;

    constructor(type:string,isRemoveble:boolean=true){
        this.isRemoveble = isRemoveble;
        this.addressType = type;
    }
}

export class Employee {
        employeeId: number;
        firstName: string;
        middleName: string;
        lastName: string;
        salutation: string;
        birthDate: string;
        gender: string;
        maritalStatus: string;
        createdAt: Date;
        updatedAt: Date;
        emailAddresses: EmailAddress[];
        phoneNumbers: PhoneNumber[];
        addresses: Address[];
}