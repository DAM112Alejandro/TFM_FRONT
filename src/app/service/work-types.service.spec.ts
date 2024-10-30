import { TestBed } from '@angular/core/testing';
import { WorkTypesService } from './work-types.service';


describe('WorkTypesService', () => {
  let service: WorkTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
