import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params , Router} from '@angular/router';
import { ProceedToPayService } from 'src/app/services/proceed-to-pay.service';
import { first } from 'rxjs/operators';
import { ApiService, ProceedToPayApi } from '../../services/api.service';



@Component({
  selector: 'app-proceed-to-pay',
  templateUrl: './proceed-to-pay.component.html',
  styleUrls: ['./proceed-to-pay.component.css']
})
export class ProceedToPayComponent implements OnInit {
  loading = true;
  proceed_to_pay: ProceedToPayApi[];
  staticContents: any;
  amount: any;
  paymentOptionsData: any;
  proceed_to_pay_static_data: any;
  // brand_redeem_amount = 0;
  // twid_redeem_amount = 0 ;
  total_amount_to_pay = 0;
  // voucher_amount = 0;
  // user_redeem_data = [];
  // user_brand_redeem_data:any;
  // user_twid_redeem_data:any;
  // private _prevSelected: any;
  // voucher_list = [];
  // user_voucher_data = [];
  // voucher_listing = [];
  // voucher_name = null;
  // favoriteSeason: string;
  // currentCheckedValue = null;  vouchers:string;
  constructor(private route:ActivatedRoute, private proceedToPay: ProceedToPayService,
              private router: Router, private apiService : ApiService) {}

  ngOnInit() {
    this.fetchStaticData();
    this.getPoceedToPayData();
    this.fetchPaymentOptions();
  }

  /**
   * Get redeemOfflinePreCheckout Response
   */
  getPoceedToPayData() {
    // this.loading = true;
    const userBillAmount = localStorage.getItem('bill_amount');
    const brandRedeemAmount = (localStorage.getItem('brand_redeem_amount')) ? localStorage.getItem('brand_redeem_amount') : 0;
    const twidRedeemAmount = (localStorage.getItem('twid_redeem_amount')) ? localStorage.getItem('twid_redeem_amount') : 0;
    const selectedVoucherId = (localStorage.getItem('selected_voucher_id')) ? localStorage.getItem('selected_voucher_id') : '';
    const userBrandId = localStorage.getItem('brand_id');
    const requestData = {
      unique_id: '1',
      customer_id: '26178',
      auth_token: 'b3c68ce1c363ffba23e96cd2',
      os: 'ios',
      version: '1.1',
      app_version: '1.0',
      latitude: '18.665446',
      longitude: '73.646545',
      city: '',
      brand_id: userBrandId,
      bill_amount: userBillAmount,
      brand_redeem_amount: brandRedeemAmount,
      twid_redeem_amount: twidRedeemAmount,
      store_id: '',
      voucher_ids: selectedVoucherId,
      offer_ids: '',
      coupon_id: '',
      online_precheckout_id: '',
      checkout_type: 'bill_transaction',
      gift_card_id: '',
      gift_card_denomination: '',
      gift_card_qty: '',
      gift_card_redeem_amount: ''
    };


    this.proceedToPay.getProceedToPayData(requestData).subscribe((response: Array<ProceedToPayApi>) => {
      this.proceed_to_pay = response;
      this.loading = false;
      // this.voucher_list = this.precheckout['data']['voucher_list'];
      /* Store Precheckout response to localStorage */
      localStorage.setItem('user_proceed_to_pay_data', JSON.stringify(this.proceed_to_pay));
    }, (err) => {
      console.log(err);
    });
  }


  fetchStaticData() {
    this.apiService.getStaticData().subscribe((response) => {
      // proceed_to_pay_static_data = localStorage.getItem('all_page_static_contents');
      this.staticContents = response;
      //this.loading = false;
    }, (err) => {
      console.log(err);
    });
  }

  fetchPaymentOptions() {
    const requestData = {
      unique_id: 12,
      // customer_id: '5',
      customer_id: '26058',
      // auth_token: '0d371e554d0c21e2afd8db2e',
      auth_token: '2883da556b1c3ccec96c323d',
      os: 'ios',
      version: '1.1',
      app_version: '1.0',
      /*latitude: '18.665446',
      longitude: '73.646545',*/
      bill_amount: '10',
      brand_redeem_amount: '3',
      twid_redeem_amount: '1',
      brand_id: 1,
      store_id: 1,
      voucher_ids: '',
      offer_ids: '',
      coupon_id: '',
      online_precheckout_id: '',
      checkout_type: 'bill_transaction',
      gift_card_id: '',
      gift_card_denomination: '',
      gift_card_qty: '',
      gift_card_redeem_amount: '',
    };
    this.apiService.getPaymentOptions(requestData).subscribe((response) => {
      // proceed_to_pay_static_data = localStorage.getItem('all_page_static_contents');
      console.log('payment options ', response);
      this.paymentOptionsData = response;
      //this.loading = false;
    }, (err) => {
      console.log(err);
    });
  }











}
