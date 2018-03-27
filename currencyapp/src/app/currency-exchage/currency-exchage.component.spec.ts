import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchageComponent } from './currency-exchage.component';

describe('CurrencyExchageComponent', () => {
  let component: CurrencyExchageComponent;
  let fixture: ComponentFixture<CurrencyExchageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyExchageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
