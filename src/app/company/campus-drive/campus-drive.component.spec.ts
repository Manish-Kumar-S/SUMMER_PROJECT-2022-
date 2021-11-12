import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusDriveComponent } from './campus-drive.component';

describe('CampusDriveComponent', () => {
  let component: CampusDriveComponent;
  let fixture: ComponentFixture<CampusDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
