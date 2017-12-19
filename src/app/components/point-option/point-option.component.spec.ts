import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOptionComponent } from './point-option.component';

describe('PointOptionComponent', () => {
  let component: PointOptionComponent;
  let fixture: ComponentFixture<PointOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
