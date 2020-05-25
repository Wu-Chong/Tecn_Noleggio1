import { TestBed } from '@angular/core/testing';

import { PrenotaRilascioService } from './prenota-rilascio.service';

describe('PrenotaRilascioService', () => {
  let service: PrenotaRilascioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenotaRilascioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
