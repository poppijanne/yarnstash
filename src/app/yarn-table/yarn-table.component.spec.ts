import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnTableComponent } from './yarn-table.component';

describe('YarnTableComponent', () => {
  let component: YarnTableComponent;
  let fixture: ComponentFixture<YarnTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
