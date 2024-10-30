import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktypeDetailsComponent } from './worktype-details.component';

describe('WorktypeDetailsComponent', () => {
  let component: WorktypeDetailsComponent;
  let fixture: ComponentFixture<WorktypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorktypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorktypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
