import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordAdminForUserComponent } from './dashbord-admin-for-user.component';

describe('DashbordAdminForUserComponent', () => {
  let component: DashbordAdminForUserComponent;
  let fixture: ComponentFixture<DashbordAdminForUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordAdminForUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordAdminForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
