import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { IXMRComponent } from './charts/ixmr/ixmr.component';
import { XbarRComponent } from './charts/xbar-r/xbar-r.component';
import { XbarSComponent } from './charts/xbar-s/xbar-s.component';
import { XbarRTableComponent } from './tables/xbar-r-table/xbar-r-table.component';


@NgModule({
  declarations: [
    AppComponent,
    FormInputsComponent,
    IXMRComponent,
    XbarRComponent,
    XbarSComponent,
    XbarRTableComponent,

  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    ScrollingModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
