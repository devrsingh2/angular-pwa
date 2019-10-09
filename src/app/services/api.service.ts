import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { RedeemOfflineApi } from '../models/redeemOfflineInit';
import { Observable, throwError } from 'rxjs';
//import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //URL = `http://localhost/twid-pwa/backend/api/redeemOfflineInit.php`;
  URL = `${environment.PHP_API_SERVER}/getStaticContent`;
  API_BASE_URL = `${environment.PHP_API_SERVER}`;

  httpOptions: {};



  constructor(private httpClient: HttpClient) {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getStaticData() {
    return this.httpClient.get(this.API_BASE_URL+'/getStaticContent');
  }

  readRedeems(): Observable<RedeemOfflineApi[]> {
    return this.httpClient.get<RedeemOfflineApi[]>(this.URL);
  }

  getAllData(): Observable<RedeemOfflineApi[]> {
    //console.log(this.httpClient.get<RedeemOfflineApi[]>(this.URL));
    let request_data = {unique_id:"1",
      customer_id:"26178",
      auth_token:"b3c68ce1c363ffba23e96cd2",
      os:"ios",
      version:"1.1",
      app_version:"1.0",
      latitude:"18.665446",
      longitude:"73.646545",
      city:"",
      brand_id:"3",
      bill_amount:"500"};
    return <Observable<RedeemOfflineApi[]>>this.httpClient.post(this.API_BASE_URL+'/redeemOfflineInit', request_data, this.httpOptions);
  }

  getPaymentOptions = (data): Observable<RedeemOfflineApi[]> => {
    return <Observable<RedeemOfflineApi[]>>this.httpClient.post(this.API_BASE_URL + '/payment-options', data, this.httpOptions);
  }

  getPromoCodes = (data): Observable<RedeemOfflineApi[]> => {
    return <Observable<RedeemOfflineApi[]>>this.httpClient.post(this.API_BASE_URL + '/payment-coupons-list', data, this.httpOptions);
  }

  applyPromoCode = (data): Observable<RedeemOfflineApi[]> => {
    return <Observable<RedeemOfflineApi[]>>this.httpClient.post(this.API_BASE_URL + '/validate-online-coupons', data, this.httpOptions);
  }

}




export interface RedeemOfflinePrecheckOutApi {
  status: true,
  message: "",
  error_code: "0",
  static: object,
  last_sms_manager_date: null,
  data: null,
  inapp_popup: null
}

export interface ProceedToPayApi {
  status: true,
  message: "",
  error_code: "0",
  static: object,
  last_sms_manager_date: null,
  data: null,
  inapp_popup: null
}


export class RedeemDataService {

  redeemData = [{
    status: true,
    login_status: true,
    message: 'Success message',
    error_code: 0,
    static: null,
    data: {
      brand_id: 13,
      brand_name: 'Woodland',
      brand_logo: 'https://beta.twidapp.com/pub/media/brand_images/a46047d9c7562303d3d332ad74497347.png',
      brand_point: 0,
      total_point: 3305,
      offer_details: [],
      min_bill_amount: 500,
      min_bill_amount_text: 'Minimum bill amount at Woodland store is Rs.500'
    },
    inapp_popup: null
  }];

}
