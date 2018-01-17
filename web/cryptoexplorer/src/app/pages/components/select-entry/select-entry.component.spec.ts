import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEntryComponent } from './select-entry.component';

describe('SelectEntryComponent', () => {
  let component: SelectEntryComponent;
  let fixture: ComponentFixture<SelectEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
