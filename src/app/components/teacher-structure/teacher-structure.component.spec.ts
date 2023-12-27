import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStructureComponent } from './teacher-structure.component';

describe('TeacherStructureComponent', () => {
  let component: TeacherStructureComponent;
  let fixture: ComponentFixture<TeacherStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
