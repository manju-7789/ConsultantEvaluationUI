import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatinFeedbackComponent } from './evaluatin-feedback.component';

describe('EvaluatinFeedbackComponent', () => {
  let component: EvaluatinFeedbackComponent;
  let fixture: ComponentFixture<EvaluatinFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatinFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatinFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
