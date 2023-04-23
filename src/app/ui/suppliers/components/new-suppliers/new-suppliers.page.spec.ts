import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSuppliersPage } from './new-suppliers.page';

describe('NewSuppliersPage', () => {
  let component: NewSuppliersPage;
  let fixture: ComponentFixture<NewSuppliersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewSuppliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
