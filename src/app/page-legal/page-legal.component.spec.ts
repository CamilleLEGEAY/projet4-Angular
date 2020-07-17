import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLegalComponent } from './page-legal.component';

describe('PageLegalComponent', () => {
  let component: PageLegalComponent;
  let fixture: ComponentFixture<PageLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
