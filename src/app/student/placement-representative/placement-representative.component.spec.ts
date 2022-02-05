import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementRepresentativeComponent } from './placement-representative.component';

describe('PlacementRepresentativeComponent', () => {
  let component: PlacementRepresentativeComponent;
  let fixture: ComponentFixture<PlacementRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementRepresentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
