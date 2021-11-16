import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveUpdateComponent } from './drive-update.component';

describe('DriveUpdateComponent', () => {
  let component: DriveUpdateComponent;
  let fixture: ComponentFixture<DriveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
