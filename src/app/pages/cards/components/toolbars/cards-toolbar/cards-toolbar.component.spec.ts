import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardsToolbarComponent} from './cards-toolbar.component';

describe('StacksToolbarComponent', () => {
  let component: CardsToolbarComponent;
  let fixture: ComponentFixture<CardsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardsToolbarComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
