import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabEpisodesPage } from './tab-episodes.page';

describe('TabEpisodesPage', () => {
  let component: TabEpisodesPage;
  let fixture: ComponentFixture<TabEpisodesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEpisodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
