import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XbarRTableComponent } from './xbar-r-table.component';

describe('XbarRTableComponent', () => {
  let component: XbarRTableComponent;
  let fixture: ComponentFixture<XbarRTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XbarRTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XbarRTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
