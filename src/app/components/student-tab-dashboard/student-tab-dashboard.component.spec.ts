import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTabDashboardComponent } from './student-tab-dashboard.component';

describe('StudentTabDashboardComponent', () => {
  let component: StudentTabDashboardComponent;
  let fixture: ComponentFixture<StudentTabDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTabDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTabDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
