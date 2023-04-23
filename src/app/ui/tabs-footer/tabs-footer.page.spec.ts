import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsFooterPage } from './tabs-footer.page';

describe('TabsFooterPage', () => {
  let component: TabsFooterPage;
  let fixture: ComponentFixture<TabsFooterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabsFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
