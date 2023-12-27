import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTabForParentComponent } from './student-tab-for-parent.component';

describe('StudentTabForParentComponent', () => {
  let component: StudentTabForParentComponent;
  let fixture: ComponentFixture<StudentTabForParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTabForParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTabForParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
