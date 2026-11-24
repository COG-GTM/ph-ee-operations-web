import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryResolveDialogComponent } from './retry-resolve-dialog.component';

describe('RetryResolveDialogComponent', () => {
  let component: RetryResolveDialogComponent;
  let fixture: ComponentFixture<RetryResolveDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RetryResolveDialogComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetryResolveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
