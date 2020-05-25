import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EvaluationProcessService } from '../shared/evaluation-process.service';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']
})
export class AddEvaluationComponent implements OnInit {
  evaluationForm: FormGroup;
  technologies = [];
  evaluatorEmails = [];
  errorMessage = '';
  successMessage = '';
  constructor(private fb: FormBuilder, private router: Router, private dataService: EvaluationProcessService) { }

  ngOnInit(): void {
    this.createEvaluationForm();
    this.getTechnologies();
  }

  createEvaluationForm() {
    this.evaluationForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      owner: this.fb.control(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/)]),
      consultant: this.fb.control(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/)]),
      evaluators: this.fb.control(null, [Validators.required, Validators.pattern(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/)]),
      technology: this.fb.control('', [Validators.required]),
      status: this.fb.control('Created')
    });
  }

  getTechnologies() {
    this.dataService.getTopLevelTechnologies().subscribe((data) => {
      // tslint:disable-next-line:no-debugger
      this.technologies = data['technologies'.toString()];
    });
  }

  addEvaluation() {
    if (this.evaluationForm.valid) {
      const evaluation = this.setFormData(this.evaluationForm);
      this.dataService.postEvaluation(evaluation).subscribe(x => {
        if (x) {
          this.successMessage = 'Evaluation Process Created';
        }
      }, (error: any) => {
        this.errorMessage = (error as any);
      });
    } else {

    }
  }

  setEmailCollection() {
    const emails = this.evaluationForm.value.evaluators.replace(/\s/g, '').split(',');
    emails.forEach((element) => {
      this.evaluatorEmails.push({
        evaluatorEmail: element,
        isSubmitted: false
      });
    });

    return this.evaluatorEmails;
  }

  // onTechnologyChange(event) {
  //   // debugger;
  // }

  setFormData(form) {
    const evaluation = {
      title: form.value.title,
      owner: form.value.owner,
      consultant: form.value.consultant,
      status: 'Created',
      evaluators: this.setEmailCollection(),
      evaluationTechnologies: [
        {
          techId: form.value.technology
        }
      ]
    };

    return evaluation;
  }

}
