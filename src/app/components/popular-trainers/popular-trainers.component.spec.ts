import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTrainersComponent } from './popular-trainers.component';

describe('PopularTrainersComponent', () => {
  let component: PopularTrainersComponent;
  let fixture: ComponentFixture<PopularTrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularTrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
