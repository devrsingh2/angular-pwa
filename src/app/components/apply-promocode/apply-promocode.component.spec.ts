import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPromocodeComponent } from './apply-promocode.component';

describe('ApplyPromocodeComponent', () => {
  let component: ApplyPromocodeComponent;
  let fixture: ComponentFixture<ApplyPromocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyPromocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyPromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
