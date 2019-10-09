import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPromoModalComponent } from './show-promo-modal.component';

describe('ShowPromoModalComponent', () => {
  let component: ShowPromoModalComponent;
  let fixture: ComponentFixture<ShowPromoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPromoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPromoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
