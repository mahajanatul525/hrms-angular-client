/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeFormService } from './employee-form.service';

describe('Service: EmployeeForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeFormService]
    });
  });

  it('should ...', inject([EmployeeFormService], (service: EmployeeFormService) => {
    expect(service).toBeTruthy();
  }));
});
