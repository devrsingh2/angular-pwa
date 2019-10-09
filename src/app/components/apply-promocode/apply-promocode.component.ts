import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { MzModalService } from 'ngx-materialize';
import { ShowPromoModalComponent } from '../show-promo-modal/show-promo-modal.component';
import { MzBaseModal, MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-apply-promocode',
  templateUrl: './apply-promocode.component.html',
  styleUrls: ['./apply-promocode.component.css']
})
export class ApplyPromocodeComponent implements OnInit {

  constructor(protected apiService: ApiService,
    private modalService: MzModalService) { }
  staticContents;
  promoCodeData;
  userPromoCodeData;
  couponDetails;
  apliedPromoCodeData;
  ngOnInit() {
    this.fetchStaticData();
    this.getCouponList();
  }

  //  Get static contents of coupon listing page
  fetchStaticData() {
    this.apiService.getStaticData().subscribe((response) => {
      this.staticContents = response;
      console.log(this.staticContents);
    }, (err) => {
      console.log(err);
    });
  }

  // Get user all coupon list
  getCouponList(){
    const customerId = localStorage.getItem('customerId');
    const authToken = localStorage.getItem('authToken');
  
    const brandId = localStorage.getItem('brand_id');
    const user_bill_amount = localStorage.getItem('bill_amount');
    const user_twid_redeem_amount = localStorage.getItem('twid_redeem_amont');
    const user_brand_redeem_amount = localStorage.getItem('brand_redeem_amont');
  
    const requestData = {
      unique_id: 1,
      customer_id: customerId,
      auth_token: authToken,
      os: 'ios',
      version: '1.1',
      app_version: '1.0',
      bill_amount: user_bill_amount,
      brand_redeem_amount: user_brand_redeem_amount,
      twid_redeem_amount: user_twid_redeem_amount,
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
    this.apiService.getPromoCodes(requestData).subscribe((response) => {
      console.log('Promo Code List ', response['data']);
      localStorage.setItem('user_promo_code_list', JSON.stringify(response['data']));
      this.promoCodeData = response['data'];
    }, (err) => {
      console.log(err);
    });
  }
  

  public openServiceModal(coupon_id) {
    // alert(coupon_id);
    this.userPromoCodeData = JSON.parse(localStorage.getItem('user_promo_code_list'));
    for (let promoCode of this.userPromoCodeData) {
      if(promoCode['offer_id'] == coupon_id){
          this.couponDetails = promoCode;
      }
    }

    console.log(this.couponDetails);

    this.modalService.open(ShowPromoModalComponent,  { couponDetails: this.couponDetails });
  }

  applyPromoCode(promo_id){
    alert(promo_id);
    const customerId = localStorage.getItem('customerId');
    const authToken = localStorage.getItem('authToken');
  
    const brandId = localStorage.getItem('brand_id');
    const user_bill_amount = localStorage.getItem('bill_amount');
    const user_twid_redeem_amount = localStorage.getItem('twid_redeem_amont');
    const user_brand_redeem_amount = localStorage.getItem('brand_redeem_amont');
  
    const promoRequest = {
      unique_id: 1,
      customer_id: customerId,
      auth_token: authToken,
      os: 'ios',
      version: '1.1',
      app_version: '1.0',
      latitude: '',
      longitude: '',
      coupon_id: promo_id,
      card_number: '',
      wallet: '',
      token_id: '',
      upi_address: '',
      online_precheckout_id:'4929'

    };
    this.apiService.applyPromoCode(promoRequest).subscribe((response) => {
      console.log('Promo Code List ', response['data']);
      localStorage.setItem('applied_coupon_data', JSON.stringify(response['data']));
      this.apliedPromoCodeData = response['data'];
    }, (err) => {
      console.log(err);
    });

  }
 

}
