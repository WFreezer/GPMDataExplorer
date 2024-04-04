import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteselectionComponent } from './satelliteselection.component';

describe('SatelliteselectionComponent', () => {
  let component: SatelliteselectionComponent;
  let fixture: ComponentFixture<SatelliteselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatelliteselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SatelliteselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
