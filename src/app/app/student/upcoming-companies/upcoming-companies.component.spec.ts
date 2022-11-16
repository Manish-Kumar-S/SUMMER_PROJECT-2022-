import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCompaniesComponent } from './upcoming-companies.component';

describe('UpcomingCompaniesComponent', () => {
  let component: UpcomingCompaniesComponent;
  let fixture: ComponentFixture<UpcomingCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
