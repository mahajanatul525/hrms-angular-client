/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlertComponentCustom } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponentCustom;
  let fixture: ComponentFixture<AlertComponentCustom>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponentCustom ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponentCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
