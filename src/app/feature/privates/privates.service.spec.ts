import { TestBed } from '@angular/core/testing';

import { PrivatesService } from './privates.service';

describe('PrivatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivatesService = TestBed.get(PrivatesService);
    expect(service).toBeTruthy();
  });
});
