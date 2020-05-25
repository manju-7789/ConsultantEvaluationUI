import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEvaluationComponent } from './add-evaluation/add-evaluation.component';
import { EvaluatinFeedbackComponent } from './evaluatin-feedback/evaluatin-feedback.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'evaluation/:id', component: EvaluatinFeedbackComponent }
  // { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
