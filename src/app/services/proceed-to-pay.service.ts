import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProceedToPayApi } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProceedToPayService {

  URL = `${environment.PHP_API_SERVER}/payment-options`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Origin': '*'
    })
  };


  constructor(private httpClient: HttpClient) {
  }



  getProceedToPayData(request_data): Observable<ProceedToPayApi[]> {
    console.log("proceed_to_pay_data");
    console.log(request_data);

    // this.httpClient.post(this.URL, request_data, this.httpOptions);

    return this.httpClient.post<ProceedToPayApi[]>(this.URL, request_data, this.httpOptions);

  }
}
