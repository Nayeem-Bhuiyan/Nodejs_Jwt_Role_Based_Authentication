import { TestBed } from '@angular/core/testing';

import { FileControlService } from './file-control.service';

describe('FileControlService', () => {
  let service: FileControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
