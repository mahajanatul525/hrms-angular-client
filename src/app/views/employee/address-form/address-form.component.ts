import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() addressForm: FormGroup
  @Input() index: number
  @Output() removeAddress: EventEmitter<number> = new EventEmitter()
  @Output() addAddress: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.removeAddress.emit(this.index)
  }

  add()
  {
    this.addAddress.emit()
  }
}
