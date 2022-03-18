import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AuthInterceptorService } from './core/services/auth/auth-interceptor.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
// import { NgxChartsModule }from '@swimlane/ngx-charts';

import { environment } from '@env';
import {
  NbThemeModule,
  NbSidebarModule,
  NbMenuModule,
  NbToastrModule,
  NbOverlayModule,
  DARK_THEME,
  NbCardModule,
  NbActionsModule,
  NbWindowModule,
  NbTreeGridModule,
  NbListModule,
  NbCheckboxModule,
  NbLayoutModule
} from '@nebular/theme';

import { CoreModule } from '@core/core.module';
import { LoginState } from '@state/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BusState } from '@state/dashboard';
import { BookState } from '@state/dashboard/book.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(
      [LoginState, BusState, BookState],
      {
        developmentMode: !environment.production
      }
    ),
    NgxsFormPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'login.currentUser'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }, [DARK_THEME]),
    NbOverlayModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbActionsModule,
    NbCardModule,
    NbTreeGridModule,
    NbListModule,
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    Ng2SmartTableModule,
    NgxMaterialTimepickerModule,
    NbCheckboxModule,
    // NgxChartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
