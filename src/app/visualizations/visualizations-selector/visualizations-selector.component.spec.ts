import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationsSelectorComponent } from './visualizations-selector.component';

describe('VisualizationsSelectorComponent', () => {
  let component: VisualizationsSelectorComponent;
  let fixture: ComponentFixture<VisualizationsSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [VisualizationsSelectorComponent]
});
    fixture = TestBed.createComponent(VisualizationsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
