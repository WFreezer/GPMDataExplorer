import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiometerselectionComponent } from './radiometerselection.component';

describe('RadiometerselectionComponent', () => {
  let component: RadiometerselectionComponent;
  let fixture: ComponentFixture<RadiometerselectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadiometerselectionComponent]
    });
    fixture = TestBed.createComponent(RadiometerselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
