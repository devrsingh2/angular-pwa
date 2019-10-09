import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PayingtoComponent } from './components/payingto/payingto.component';
import { ConfirmToPayComponent } from './components/confirm-to-pay/confirm-to-pay.component';
import { ProceedToPayComponent } from './components/proceed-to-pay/proceed-to-pay.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { PrecheckoutserviceService } from './services/precheckoutservice.service';
import { ApiService } from './services/api.service';
import { MatRadioModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { MzTabModule, MzModalService, MzInjectionService, MzModalModule } from 'ngx-materialize';
import { MatButtonModule } from '@angular/material';
import { MatRippleModule } from '@angular/material';
import { ApplyPromocodeComponent } from './components/apply-promocode/apply-promocode.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ShowPromoModalComponent } from './components/show-promo-modal/show-promo-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material';
// import { MatDialogTitle, MatDialogRef } from '@angular/material'
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    PayingtoComponent,
    ConfirmToPayComponent,
    ProceedToPayComponent,
    ApplyPromocodeComponent,
    ShowPromoModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatRadioModule,
    MzTabModule,
    MzModalModule,
    // MatButtonModule,
    // MatRippleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatDialogModule,
    // MatDialogTitle,
    // MatDialogRef
  ],
  providers: [
    ApiService,
    PrecheckoutserviceService,
    MzModalService,
    MzInjectionService
    // { provide: MatDialogTitle, useValue: {} }, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] }

  ],
  entryComponents: [
    ShowPromoModalComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class AppModule { }
