import { Component, OnInit } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ngx-materialize';
import { MzModalModule } from 'ngx-materialize';
import { MzModalService } from 'ngx-materialize';


@Component({
  selector: 'app-show-promo-modal',
  templateUrl: './show-promo-modal.component.html',
  styleUrls: ['./show-promo-modal.component.css']
})
export class ShowPromoModalComponent extends MzBaseModal  {
  
  couponDetails: any;
}
