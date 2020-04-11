import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';

import { CreateCustomerV2Component } from './create-customer-v2.component';
import { ListCustomersComponent } from './list-customers.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CustomerRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateCustomerV2Component,
    ListCustomersComponent
  ]
})

export class CustomerModule { }