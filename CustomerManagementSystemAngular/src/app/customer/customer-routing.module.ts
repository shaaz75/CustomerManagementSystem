import { NgModule } from '@angular/core';
// Import RouterModule & Routes type
import { RouterModule, Routes } from '@angular/router';

// Import all the components that we will be referencing in the route definitions
import { CreateCustomerV2Component } from './create-customer-v2.component';
import { ListCustomersComponent } from './list-customers.component';

// Define the routes
const appRoutes: Routes = [
  { path: '', component: ListCustomersComponent },
      { path: 'create', component: CreateCustomerV2Component },
      { path: 'edit/:id', component: CreateCustomerV2Component }
];

// In a feature module forChild() method must be used to register routes
// Export RouterModule, so the it's directives like RouterLink, RouterOutlet
// are available to the CustomerModule that imports this module
@NgModule({
  imports: [ RouterModule.forChild(appRoutes)],
  exports: [ RouterModule ]
})
export class CustomerRoutingModule { }