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
  @Output() deletePlayer: EventEmitter<number> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deletePlayer.emit(this.index)
  }
}
