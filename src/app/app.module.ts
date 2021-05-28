import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { httpInterceptorProviders } from "./core/intercepters/httpInterceptorProviders";
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import{NgxPaginationModule} from 'ngx-pagination'



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {AlertComponentCustom} from './views/alert/alert.component'
import { AppService } from './app.service'

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
//import { AlertModule } from 'ngx-bootstrap/alert';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DataTablesModule } from 'angular-datatables';
import { EmployeeComponent } from './views/employee/employee.component';






@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    DataTablesModule,
    

    
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    EmployeeComponent,
    AlertComponentCustom,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,

    },
    IconSetService,
    httpInterceptorProviders,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
