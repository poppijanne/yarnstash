import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnDetailsComponent } from './yarn-details.component';

describe('YarnDetailsComponent', () => {
  let component: YarnDetailsComponent;
  let fixture: ComponentFixture<YarnDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
