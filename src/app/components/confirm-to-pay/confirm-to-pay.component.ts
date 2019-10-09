import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute , Params , Router} from '@angular/router';
import { PrecheckoutserviceService } from 'src/app/services/precheckoutservice.service';
import { first } from 'rxjs/operators';
import { ApiService, RedeemOfflinePrecheckOutApi } from '../../services/api.service';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-confirm-to-pay',
  templateUrl: './confirm-to-pay.component.html',
  styleUrls: ['./confirm-to-pay.component.css']
})
export class ConfirmToPayComponent implements OnInit {
  loading = true;
  precheckout: any;
  staticContents: any;
  amount: any;
  isProcessing = false;
  brand_redeem_amount: any = 0;
  twid_redeem_amount: any = 0 ;
  twid_redeem_point: any = 0 ;
  total_amount_to_pay: any = 0;
  voucher_amount = 0;
  user_redeem_data = [];
  user_brand_redeem_data: any;
  user_twid_redeem_data: any;
  private _prevSelected: any;
  voucher_list: any;
  user_voucher_data = [];
  voucher_listing = [];
  voucher_name = null;
  selectedVoucherChk = false;
  selectedVoucherId = '';
  selectedLibertyPoint = '';
  selectedTwidPoint = '';
  favoriteSeason: string;
  currentCheckedValue = null;  vouchers: string;
  constructor(private route: ActivatedRoute, private preCheckoutService: PrecheckoutserviceService,
              private router: Router, private apiService: ApiService, private ren: Renderer2) {
    this.route.params.subscribe( params => {
      this.amount = params['amount'];
      console.log(this.amount);
      localStorage.setItem('bill_amount', this.amount);
      this.total_amount_to_pay = this.amount;
    });
  }

  ngOnInit() {
    this.fetchStaticData();
    this.getPreCheckOutData();
    localStorage.setItem('selected_voucher_id', '');
    localStorage.setItem('twid_redeem_amount', '');
    localStorage.setItem('brand_redeem_amount', '');
  }

  /**
   * Get redeemOfflinePreCheckout Response
   */
  getPreCheckOutData() {
    const userBillAmount = localStorage.getItem('bill_amount');
    const redeemBrandId = localStorage.getItem('brand_id');
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
      brand_id: redeemBrandId,
      bill_amount: userBillAmount
    };
    this.preCheckoutService.getPrecheckoutData(requestData).subscribe((response) => {
      this.precheckout = response;
      this.loading = false;
      if (isDefined(response)) {
        this.voucher_list = this.precheckout.data.voucher_list;
        /* Store Precheckout response to localStorage */
        localStorage.setItem('user_redeem_data', JSON.stringify(this.precheckout));
      }
    }, (err) => {
      console.log(err);
    });
  }

  fetchStaticData() {
    this.apiService.getStaticData().subscribe((response) => {
      this.staticContents = response;
      //this.loading = false;
      console.log(this.staticContents['static']['pay_offline_page']);
    }, (err) => {
      console.log(err);
    });
  }

  toggleEditable(event) {
    if (event.target.checked) {
      this.user_brand_redeem_data = JSON.parse(localStorage.getItem('user_redeem_data'));
      this.selectedLibertyPoint = this.user_brand_redeem_data['data']['brand_redeemable']['point'];
      this.brand_redeem_amount = this.user_brand_redeem_data['data']['brand_redeemable']['amount'];
    } else {
      this.selectedLibertyPoint = '';
    }
    this.isProcessing = true;
    this.getPreCheckOutDataWithTwidAndBrandPoints(this.selectedTwidPoint, this.selectedLibertyPoint, this.selectedVoucherId);
    localStorage.setItem('brand_redeem_amount', this.brand_redeem_amount);
  }

  toggleTwidEditable(event) {
    if (event.target.checked) {
      this.user_twid_redeem_data = JSON.parse(localStorage.getItem('user_redeem_data'));
      this.selectedTwidPoint = this.user_twid_redeem_data['data']['twid_redeemable']['point'];
      this.twid_redeem_amount = this.user_twid_redeem_data['data']['twid_redeemable']['amount'];
      // this.isProcessing = true;
    } else {
      this.selectedTwidPoint = '';
    }
    this.isProcessing = true;
    this.getPreCheckOutDataWithTwidAndBrandPoints(this.selectedTwidPoint, this.selectedLibertyPoint, this.selectedVoucherId);
    localStorage.setItem('twid_redeem_amount', this.twid_redeem_amount);
  }

  getPreCheckOutDataWithTwidAndBrandPoints = (twidPoints = '', libertyPoint = '', selectedVoucherId = '') => {
    const userBillAmount = localStorage.getItem('bill_amount');
    const redeemBrandId = localStorage.getItem('brand_id');
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
      brand_id: redeemBrandId,
      bill_amount: userBillAmount,
      voucher_ids: (selectedVoucherId !== undefined) ? selectedVoucherId : '',
      brand_points_applied: (libertyPoint !== undefined) ? libertyPoint : '',
      all_points_applied: (twidPoints !== undefined) ? twidPoints : '',
    };

    this.preCheckoutService.getPrecheckoutVoucherData(requestData).subscribe((response) => {
      this.precheckout = response;
      // this.loading = false;
      if (isDefined(response)) {
        this.voucher_list = this.precheckout.data.voucher_list;
        this.total_amount_to_pay = this.precheckout.data.remaining_balance;
        this.isProcessing = false;
        /* Store Precheckout response to localStorage */
        // localStorage.setItem('selected_voucher_id', voucherId);
        localStorage.setItem('user_redeem_data', JSON.stringify(this.precheckout));
      }
    }, (err) => {
      console.log(err);
    });
  }

  getPreCheckOutDataWithVoucher(voucherId) {
    const userBillAmount = localStorage.getItem('bill_amount');
    const redeemBrandId = localStorage.getItem('brand_id');
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
      brand_id: redeemBrandId,
      bill_amount: userBillAmount,
      voucher_ids: voucherId,
      brand_points_applied: this.selectedLibertyPoint,
      all_points_applied: this.selectedTwidPoint
    };
    this.preCheckoutService.getPrecheckoutVoucherData(requestData).subscribe((response) => {
      this.precheckout = response;
      // this.loading = false;
      this.isProcessing = false;
      if (isDefined(response)) {
        this.voucher_list = this.precheckout.data.voucher_list;
        this.total_amount_to_pay = this.precheckout.data.remaining_balance;
        this.selectedVoucherId = voucherId;
        /* Store Precheckout response to localStorage */
        localStorage.setItem('selected_voucher_id', this.selectedVoucherId);
        localStorage.setItem('user_redeem_data', JSON.stringify(this.precheckout));
      }
    }, (err) => {
      console.log(err);
    });
  }


  handleBrandChange(evt) {
    var target = evt.target;
    this.user_voucher_data = JSON.parse(localStorage.getItem('user_redeem_data'));



    if (target.checked) {
      this.voucher_listing = this.user_voucher_data['data']['voucher_list'];
      for (let voucher of this.voucher_listing) {
        this.voucher_amount = this.voucher_amount + voucher['discount_amount']
        this.total_amount_to_pay = this.total_amount_to_pay - this.voucher_amount;
      }
      this._prevSelected = target;
      // if (this.checked == target.value) this.checked = "off"; target.checked = false;
    } else {

      target.checked = false;
      this.voucher_name = null;
      this.voucher_amount = 0;
      this.total_amount_to_pay = this.total_amount_to_pay;
    }
  }

  checkState(el) {
    // this.loading = true;
    this.selectedVoucherChk = true;
    this.isProcessing = true;
    this.getPreCheckOutDataWithVoucher(el);
    // setTimeout(() => {

    //   if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
    //     el.checked = false;
    //     this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
    //     this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
    //     this.currentCheckedValue = null;
    //     this.favoriteSeason = null;
    //   } else {

    //     this.currentCheckedValue = el.value
    //   }
    // })

  }

}
