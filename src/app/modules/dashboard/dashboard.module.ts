import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbSpinnerModule, NbDialogModule, NbWindowModule, NbTreeGridModule, NbListModule } from '@nebular/theme';
import { SharedModule } from '@shared/shared.module';

import * as fromComponents from './pages';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Ng2CompleterModule } from 'ng2-completer';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@core/services/auth/auth-interceptor.service';

@NgModule({
  declarations: [fromComponents.components],
  imports: [
    CommonModule,
    SharedModule,
    NbSpinnerModule,
    DashboardRoutingModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    Ng2CompleterModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    NbListModule
  ],
  entryComponents: [

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class DashboardModule {}
