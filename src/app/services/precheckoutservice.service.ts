import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RedeemOfflinePrecheckOutApi } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PrecheckoutserviceService {

  URL = `${environment.PHP_API_SERVER}/redeemOfflinePreCheckout`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getPrecheckoutData(requestData) {
    // this.httpClient.post(this.URL, request_data, this.httpOptions);
    return this.httpClient.post(this.URL, requestData, this.httpOptions);
  }

  getPrecheckoutVoucherData(requestData) {
    // this.httpClient.post(this.URL, request_data, this.httpOptions);
    return this.httpClient.post(this.URL, requestData, this.httpOptions);
  }
}
