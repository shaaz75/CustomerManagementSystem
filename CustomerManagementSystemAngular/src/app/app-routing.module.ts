import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [
  { path: 'customers', loadChildren: './customer/customer.module#CustomerModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
