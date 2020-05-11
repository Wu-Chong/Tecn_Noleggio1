import { TestBed } from '@angular/core/testing';

import { BiciclettaService } from './bicicletta.service';

describe('BiciclettaService', () => {
  let service: BiciclettaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiciclettaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
