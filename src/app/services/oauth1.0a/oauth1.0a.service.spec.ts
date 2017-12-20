import { TestBed, inject } from '@angular/core/testing';

import { Oauth1.0aService } from './oauth1.0a.service';

describe('Oauth1.0aService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Oauth1.0aService]
    });
  });

  it('should be created', inject([Oauth1.0aService], (service: Oauth1.0aService) => {
    expect(service).toBeTruthy();
  }));
});
