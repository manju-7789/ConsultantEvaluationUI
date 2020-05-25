import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EvaluationProcessService {

    readonly rootURL = 'https://localhost:44375/api';


    constructor(private http: HttpClient) { }

    getEvaluationList(): any {
        return this.http.get(this.rootURL + '/Evaluation');
    }
    getTopLevelTechnologies() {
        return this.http.get(this.rootURL + '/Technologies');
    }

    getEvaluationById(id: number): any {
        return this.http.get(this.rootURL + '/Evaluation/' + id);
    }

    getTechSubAreas(techId) {
        return this.http.get(this.rootURL + '/Technologies/' + techId);
    }

    postEvaluation(formData) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Content-Type': 'application/json; charset=utf8',
            })
        };
        return this.http.post(this.rootURL + '/Evaluation', formData, httpOptions);
    }

    postTechRecommendation(techNotes) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Content-Type': 'application/json; charset=utf8',
            })
        };
        return this.http.post(this.rootURL + '/Technologies/AddTechnologyNotes', techNotes, httpOptions);
    }

    postSubAreaFeedback(subAreaNotes) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Content-Type': 'application/json; charset=utf8',
            })
        };
        return this.http.post(this.rootURL + '/Technologies/AddSubAreFeedback', subAreaNotes, httpOptions);
    }

    //   postPaymentDetail() {
    //     return this.http.post(this.rootURL + '/PaymentDetail', this.formData);
    //   }
    //   putPaymentDetail() {
    //     return this.http.put(this.rootURL + '/PaymentDetail/'+ this.formData.PMId, this.formData);
    //   }
    //   deletePaymentDetail(id) {
    //     return this.http.delete(this.rootURL + '/PaymentDetail/'+ id);
    //   }

    //   refreshList(){
    //     this.http.get(this.rootURL + '/PaymentDetail')
    //     .toPromise()
    //     .then(res => this.list = res as PaymentDetail[]);
    //   }
}
