import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBarComponent } from './material-bar.component';

describe('MaterialBarComponent', () => {
  let component: MaterialBarComponent;
  let fixture: ComponentFixture<MaterialBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
