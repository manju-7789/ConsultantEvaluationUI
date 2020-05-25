import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EvaluationProcessService } from '../shared/evaluation-process.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluatin-feedback',
  templateUrl: './evaluatin-feedback.component.html',
  styleUrls: ['./evaluatin-feedback.component.css']
})
export class EvaluatinFeedbackComponent implements OnInit {
  sub: Subscription;
  feedbackForm: FormGroup;
  evaluationId: number;
  evaluationData = [];
  technologies = [];
  techSubAreaList = [];
  techId: number;
  evaluationTitle = '';
  consultantEmail = '';
  isRecommendation = false;
  isFeedback = false;
  constructor(private route: ActivatedRoute, private router: Router, private dataService: EvaluationProcessService,
    // tslint:disable-next-line:align
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createFeedbackForm();
    this.sub = this.route.params.subscribe(
      params => {
        this.evaluationId = +params.id;
        this.getEvaluationById();
      });
  }

  createFeedbackForm() {
    this.feedbackForm = this.fb.group({
      technology: this.fb.control('', [Validators.required]),
      recommendation: this.fb.control(''),
      subArea: this.fb.control('', [Validators.required]),
      feedback: this.fb.control('')
    });
  }

  getEvaluationById() {
    this.dataService.getEvaluationById(this.evaluationId).subscribe((data) => {
      // tslint:disable-next-line:no-debugger
      this.evaluationData = data;
      this.evaluationTitle = this.evaluationData[0].title;
      this.consultantEmail = this.evaluationData[0].consultant;
    });
    this.getTechnologies();
  }

  getTechnologies() {
    this.dataService.getTopLevelTechnologies().subscribe((data) => {
      // tslint:disable-next-line:no-debugger
      this.technologies = data['technologies'.toString()];
    });
  }

  getTechSubArea(techId) {
    this.dataService.getTechSubAreas(techId).subscribe((data) => {
      // tslint:disable-next-line:no-debugger
      // tslint:disable-next-line:no-string-literal
      this.techSubAreaList = data['techSubAreas'];
    });
  }

  onTechnologyChange(event: number) {
    // tslint:disable-next-line:no-debugger
    debugger;
    if (event) {
      this.techId = event;
      this.isRecommendation = true;
      this.getTechSubArea(event);
    } else {
      this.isRecommendation = false;
      this.isFeedback = false;
    }
  }

  onTechsubAreaChange(event: number) {
    if (event) {
      this.isFeedback = true;
    } else {
      this.isFeedback = false;
    }
  }

  setRecommendation() {
    const notes =
    {
      recommendationNotes: this.feedbackForm.value.recommendation,
      evaluatorId: this.evaluationId,
      techId: this.feedbackForm.value.technology
    };

    return notes;
  }

  setFeedback() {
    const notes =
    {
      feedbackNotes: this.feedbackForm.value.feedback,
      evaluatorId: this.evaluationId,
      subTechId: this.feedbackForm.value.subArea
    };

    return notes;
  }

  AddEvaluationFeedback() {
    if (this.feedbackForm.value.recommendation) {
      const notes = this.setRecommendation();
      this.dataService.postTechRecommendation(notes).subscribe(x => {
        if (x) {
          // this.successMessage = 'Evaluation Process Created';
        }
      }, (error: any) => {
        // this.errorMessage = (error as any);
      });
    }
    if (this.feedbackForm.value.feedback) {
      const notes = this.setFeedback();
      this.dataService.postSubAreaFeedback(notes).subscribe(x => {
        if (x) {
          // this.successMessage = 'Evaluation Process Created';
        }
      }, (error: any) => {
        // this.errorMessage = (error as any);
      });
    }
  }

}
