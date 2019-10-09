import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, RedeemDataService } from '../../services/api.service';
import { RedeemOfflineApi } from '../../models/redeemOfflineInit';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
    selector: 'app-payingto',
    templateUrl: './payingto.component.html',
    styleUrls: ['./payingto.component.css']
})
export class PayingtoComponent implements OnInit {
    redeems: RedeemOfflineApi[];
    redeemsData: RedeemOfflineApi[];
    amount;
    formdata;
    payingToForm: FormGroup;
    submitted = false;
    staticContents: any;
    minimum_bill_value = '';
    min_bill_amount = '';
    brand_logo = '';
    loading = true;

    qtn = new RedeemDataService();
    qtnArr = this.qtn.redeemData;

    API_BASE_URL = `${environment.PHP_API_SERVER}`;

    constructor(private apiService: ApiService,  private _router: Router,
                private httpClient: HttpClient, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.getAllData();
        this.fetchStaticData();
        /*this.payingToForm = this.formBuilder.group({
            amount: ['', Validators.required, Validators.min(localStorage.getItem('min_bill_amount'))]
        }, {
            // validator: MustMatch('password', 'confirmPassword')
        });*/
        this.payingToForm = new FormGroup({
            amount: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(parseFloat(localStorage.getItem('min_bill_amount'))),
                // Validators.max(parseFloat(localStorage.getItem('min_bill_amount'))),
            ]))
        })
        this.apiService.readRedeems().subscribe((redeems: RedeemOfflineApi[]) => {
            this.redeems = redeems;
            //console.log(this.redeems, 'data ---------');
        });
    }

    fetchStaticData() {
        this.apiService.getStaticData().subscribe((response) => {
            this.staticContents = response;
            this.loading = false;
            console.log(this.staticContents['static']['pay_now_page'])
        }, (err)=>{
            console.log(err);
        });
    }

    getAllData(): void {
        this.apiService.getAllData()
            .subscribe(response => {
                this.redeems = response;
                this.loading = false;
                // console.log('this.redeems ', this.redeems);
                this.min_bill_amount = response['data']['min_bill_amount'];
                this.minimum_bill_value = response['data']['min_bill_amount_text'];
                this.brand_logo = response['data']['brand_logo'];
                localStorage.setItem('min_bill_amount', response['data']['min_bill_amount']);
                localStorage.setItem('brand_id', response['data']['brand_id']);
            },(err) => {
                console.log(err);
            });
    }

    onEnter() {
        this._router.navigate(['confirm']);
    }

    keyDownFunction(event) {
        const inputValue = event.target.value;
        // if(inputValue < 500){
        //   alert("Please enter amount greater than 500");
        // }
        if (event.keyCode == 13) {
            // alert('you just clicked enter');
            // rest of your code
        }
    }

    get f() { return this.payingToForm.controls; }

    validateCharacters(control: FormControl) {
        // first check if the control has a value
        if (control.value && control.value.length > 0) {

            // match the control value against the regular expression
            const matches = control.value.match(this.minimum_bill_value);

            // if there are matches return an object, else return null.
            return matches && matches.length ? { invalid_characters: matches } : null;
        } else {
            return null;
        }
    }

    onClickSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.payingToForm.invalid) {
            return;
        }
        this.amount = this.payingToForm.value.amount;
        localStorage.setItem('bill_amount', this.amount);
        this._router.navigate(['/confirm', this.amount]);
    }
}
