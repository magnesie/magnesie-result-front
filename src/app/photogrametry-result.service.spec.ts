import { TestBed } from '@angular/core/testing';

import { PhotogrametryResultService } from './photogrametry-result.service';

describe('PhotogrametryResultService', () => {
  let service: PhotogrametryResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotogrametryResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
