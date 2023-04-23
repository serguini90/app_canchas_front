import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSuppliersPage } from './edit-suppliers.page';

describe('EditSuppliersPage', () => {
  let component: EditSuppliersPage;
  let fixture: ComponentFixture<EditSuppliersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditSuppliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
