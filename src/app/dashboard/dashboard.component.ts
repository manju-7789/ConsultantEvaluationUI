import { Component, OnInit } from '@angular/core';
import { EvaluationProcessService } from '../shared/evaluation-process.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  evaluationList = [];
  evaluationId = 0;
  constructor(private dataService: EvaluationProcessService, private router: Router) {


  }

  ngOnInit() {
    this.dataService.getEvaluationList().subscribe((data: any[]) => {
      // tslint:disable-next-line:no-debugger
      debugger;
      console.log(data);
      this.evaluationList = data;
      this.evaluationList.forEach(ele => {
        ele.evaluatorEmails = Array.prototype.map.call(ele.evaluators, (s: { evaluatorEmail: any; }) => s.evaluatorEmail).toString();
      });
    });
  }

  addEvaluation() {
    this.router.navigate([`/creation`]);
  }

  evaluationFeedback(evaluationId) {
    this.router.navigate(['/evaluation', evaluationId]);
  }

}
