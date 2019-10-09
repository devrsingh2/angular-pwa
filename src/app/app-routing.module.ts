import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayingtoComponent } from './components/payingto/payingto.component';
import { ConfirmToPayComponent } from './components/confirm-to-pay/confirm-to-pay.component';
import { ProceedToPayComponent } from './components/proceed-to-pay/proceed-to-pay.component';
import {ApplyPromocodeComponent} from './components/apply-promocode/apply-promocode.component';

const routes: Routes = [
  {path: '', component: PayingtoComponent},
  {path: 'home', component: PayingtoComponent},
  {path: 'confirm', component: ConfirmToPayComponent},
  {path: 'confirm/:amount', component: ConfirmToPayComponent},
  
  {path: 'proceed', component: ProceedToPayComponent},
  {path: 'apply-promo-code', component: ApplyPromocodeComponent},
  {path: 'apply-user-promocode/:promo_id', component: ApplyPromocodeComponent},

  {path: '**', component: PayingtoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
