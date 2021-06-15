
export class EmailAddress {
    id: number;
    type: string;
    address: string;
}

export class PhoneNumber {
    id: number;
    number: string;
    type: string;
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

    constructor(isRemoveble:boolean){
        this.isRemoveble = isRemoveble;
    }
}

export class Employee {
    private _employeeId: number;
    public get employeeId(): number {
        return this._employeeId;
    }
    public set employeeId(value: number) {
        this._employeeId = value;
    }
    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    private _middleName: string;
    public get middleName(): string {
        return this._middleName;
    }
    public set middleName(value: string) {
        this._middleName = value;
    }
    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    private _salutation: string;
    public get salutation(): string {
        return this._salutation;
    }
    public set salutation(value: string) {
        this._salutation = value;
    }
    private _birthDate: string;
    public get birthDate(): string {
        return this._birthDate;
    }
    public set birthDate(value: string) {
        this._birthDate = value;
    }
    private _gender: string;
    public get gender(): string {
        return this._gender;
    }
    public set gender(value: string) {
        this._gender = value;
    }
    private _maritalStatus: string;
    public get maritalStatus(): string {
        return this._maritalStatus;
    }
    public set maritalStatus(value: string) {
        this._maritalStatus = value;
    }
    private _createdAt: Date;
    public get createdAt(): Date {
        return this._createdAt;
    }
    public set createdAt(value: Date) {
        this._createdAt = value;
    }
    private _updatedAt: Date;
    public get updatedAt(): Date {
        return this._updatedAt;
    }
    public set updatedAt(value: Date) {
        this._updatedAt = value;
    }
    private _emailAddresses: EmailAddress[];
    public get emailAddresses(): EmailAddress[] {
        return this._emailAddresses;
    }
    public set emailAddresses(value: EmailAddress[]) {
        this._emailAddresses = value;
    }
    private _phoneNumbers: PhoneNumber[];
    public get phoneNumbers(): PhoneNumber[] {
        return this._phoneNumbers;
    }
    public set phoneNumbers(value: PhoneNumber[]) {
        this._phoneNumbers = value;
    }
    private _addresses: Address[];
    public get addresses(): Address[] {
        return this._addresses;
    }
    public set addresses(value: Address[]) {
        this._addresses = value;
    }


}