import { TestBed } from '@angular/core/testing';

import { EmployeeinfoService } from './employeeinfo.service';

describe('EmployeeinfoService', () => {
  let service: EmployeeinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
