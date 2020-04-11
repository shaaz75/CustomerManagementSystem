 import { Component, OnInit } from '@angular/core';
// Import FormGroup and FormControl classes
import { FormGroup,FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import {CustomValidators} from '../shared/custom.validators'
import { Key } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { ICustomer } from './ICustomer';

@Component({
  selector: 'app-create-customer-v2',
  templateUrl: './create-customer-v2.component.html',
  styleUrls: ['./create-customer-v2.component.css']
})
export class CreateCustomerV2Component implements OnInit {
  // This FormGroup contains fullName and Email form controls
  customerForm: FormGroup;
  customer:ICustomer;
  pageTitle: string;
  fullNameLength=0;

  constructor(private fb:FormBuilder,
              private route:ActivatedRoute,
              private customerService:CustomerService,
              private router: Router) { }

  // This object will hold the messages to be displayed to the user
// Notice, each key in this object has the same name as the
// corresponding form control
// Include phone property
formErrors = {
};

// Include required error message for phone form control
validationMessages = {
  'name': {
    'required': 'Name is required.',
    'minlength': 'Name must be greater than 2 characters',
    'maxlength': 'Name must be less than 10 characters.',
  },
  'gender': {
    'required': 'Gender is required.'
  },
  'email': {
    'required': 'Email is required.',
    'emailDomain': 'Email domian should be niksaj.com'
  }
};

  // Initialise the FormGroup with the 2 FormControls we need.
  // ngOnInit ensures the FormGroup and it's form controls are
  // created when the component is initialised
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const CustomerId = +params.get('CustomerId');
      if (CustomerId) {
        this.pageTitle = 'Create Customer';
        this.getCustomer(CustomerId);
      } else {
        this.pageTitle = 'Create Customer';
        this.customer = {
          CustomerId: null,
          Name: '',
          Gender: '',
          Email: ''
        };
      }
    });

    // Modify the code to include required validators on
    // all form controls
    this.customerForm = this.fb.group({
      Name: ['', [Validators.required,
      Validators.minLength(2), Validators.maxLength(10)]],
      Gender: ['', [Validators.required]],
      Email: ['', [Validators.required,CustomValidators.emailDomain('niksaj.com')]],
    });

    this.customerForm.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.customerForm);
    });
}

getCustomer(CustomerId: number) {
  this.customerService.getCustomer(CustomerId)
    .subscribe(
      (customer: ICustomer) => {
        // Store the customer object returned by the
        // REST API in the customer property
        this.customer = customer;
        // this.editCustomer(customer);
      },
      (err: any) => console.log(err)
    );
}

  logKeyValuePairs(group: FormGroup,isDisabled:boolean): void {
    // loop through each key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);
      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl,isDisabled);
        // If the control is not a FormGroup then we know it's a FormControl
      } else {
         console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
        if(isDisabled) {
        abstractControl.disable();
        }
        else{
          abstractControl.enable();
        }
      }
    });
  }

  logValidationErrors(group: FormGroup = this.customerForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
  
      this.formErrors[key] = '';
      // abstractControl.value !== '' (This condition ensures if there is a value in the
      // form control and it is not valid, then display the validation error)
      if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
  
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
  
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onSubmit(): void {
    this.mapFormValuesToCustomerModel();
    if (this.customer.CustomerId) {
      this.customerService.updateCustomer(this.customer).subscribe(
        () => this.router.navigate(['customers']),
        (err: any) => console.log(err)
      );
    } else {
      this.customerService.addCustomer(this.customer).subscribe(
        () => this.router.navigate(['customers']),
        (err: any) => console.log(err)
      );
    }
  }

  mapFormValuesToCustomerModel() {
    this.customer.Name = this.customerForm.value.Name;
    this.customer.Gender = this.customerForm.value.Gender;
    this.customer.Email = this.customerForm.value.Email;
  }
}