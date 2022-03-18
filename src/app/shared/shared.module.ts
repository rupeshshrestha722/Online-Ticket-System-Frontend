import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbThemeModule,
  NbLayoutModule,
  NbAlertModule,
  NbCardModule,
  NbToastrModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbSidebarModule,
  NbMenuModule,
  NbSelectModule,
  DARK_THEME,
  NbActionsModule,
  NbUserModule,
  NbSearchModule,
  NbContextMenuModule,
  NbSpinnerModule,
  NbWindowModule,
  NbDatepickerModule
} from '@nebular/theme';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import * as fromComponents from './components';
import * as fromDirectives from './directives';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [...fromComponents.components, ...fromDirectives.directives],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot({ name: 'default' }, [DARK_THEME]),
    NgxsFormPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NbAlertModule,
    NbCardModule,
    NbToastrModule.forRoot(),
    NbSelectModule,
    NbActionsModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbUserModule,
    NbMenuModule,
    NbContextMenuModule,
    NbSearchModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbWindowModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NgxMaterialTimepickerModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    NgxsResetPluginModule,
    NgxsRouterPluginModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbAlertModule,
    NbCardModule,
    NbToastrModule,
    NbIconModule,
    NbSelectModule,
    NbSearchModule,
    NbUserModule,
    NbMenuModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSidebarModule,
    NbActionsModule,
    NbContextMenuModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbWindowModule,
    NbDatepickerModule,
    NgxMaterialTimepickerModule,
    ...fromComponents.components,
    ...fromDirectives.directives
  ]
})
export class SharedModule {}
