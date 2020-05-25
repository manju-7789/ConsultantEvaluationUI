import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EvaluationProcessService } from './shared/evaluation-process.service';
import { AddEvaluationComponent } from './add-evaluation/add-evaluation.component';
import {ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EvaluatinFeedbackComponent } from './evaluatin-feedback/evaluatin-feedback.component';
@NgModule({
  declarations: [
    AppComponent,
    AddEvaluationComponent,
    DashboardComponent,
    EvaluatinFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [EvaluationProcessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
