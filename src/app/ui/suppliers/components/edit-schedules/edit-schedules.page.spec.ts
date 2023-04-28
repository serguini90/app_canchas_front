import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSchedulesPage } from './edit-schedules.page';

describe('EditSchedulesPage', () => {
  let component: EditSchedulesPage;
  let fixture: ComponentFixture<EditSchedulesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditSchedulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
