import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInvoiceItemsAddComponent } from './settings-invoice-items-add.component';

describe('SettingsInvoiceItemsAddComponent', () => {
  let component: SettingsInvoiceItemsAddComponent;
  let fixture: ComponentFixture<SettingsInvoiceItemsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsInvoiceItemsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsInvoiceItemsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
