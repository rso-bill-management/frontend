import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInvoiceItemsComponent } from './settings-invoice-items.component';

describe('SettingsInvoiceItemsComponent', () => {
  let component: SettingsInvoiceItemsComponent;
  let fixture: ComponentFixture<SettingsInvoiceItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsInvoiceItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsInvoiceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
