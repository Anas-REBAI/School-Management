import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesOneComponent } from './courses-one.component';

describe('CoursesOneComponent', () => {
  let component: CoursesOneComponent;
  let fixture: ComponentFixture<CoursesOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
