import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { ICustomer } from './ICustomer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  customers: ICustomer[];

  constructor(private _customerService: CustomerService,
    private _router: Router) { }

  ngOnInit() {
    this._customerService.getCustomers().subscribe(
      (listCustomers) => this.customers = listCustomers,
      (err) => console.log(err)
    );
  }

  editButtonClick(CustomerId: number) {
    this._router.navigate(['/customers/edit', CustomerId]);
  }

}