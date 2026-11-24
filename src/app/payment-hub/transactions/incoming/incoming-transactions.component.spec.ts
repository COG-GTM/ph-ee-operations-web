import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingTransactionsComponent } from './incoming-transactions.component';

describe('TransactionsComponent', () => {
  let component: IncomingTransactionsComponent;
  let fixture: ComponentFixture<IncomingTransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IncomingTransactionsComponent]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
