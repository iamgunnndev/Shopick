import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ShopickFormService } from '../services/shopick-form.service';
import { ShopickValidators } from '../validators/shopick-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ShopickFormServices: ShopickFormService,
              private cartService: CartService) { }
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  ngOnInit(): void {

    this.reviewCartDetails();


    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2), 
                               ShopickValidators.notOnlyWhitespace]),
        lastName:  new FormControl('', 
                               [Validators.required, 
                                Validators.minLength(2), 
                                ShopickValidators.notOnlyWhitespace]),
        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    
        phone:new FormControl('',
                                [Validators.required, Validators.pattern('[0-9]'), 
                                Validators.maxLength(10),
                                ShopickValidators.notOnlyWhitespace]),
      }),
      shippingAddress: this.formBuilder.group({
        address: new FormControl('', 
                             [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        district:new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        subdistrict:new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        province: new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        address: new FormControl('', 
                             [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        district:new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        subdistrict:new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        province: new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              ShopickValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2), 
                                ShopickValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

 // populate credit card months

 const startMonth: number = new Date().getMonth() + 1;
 console.log("startMonth: " + startMonth);

 this.ShopickFormServices.getCreditCardMonths(startMonth).subscribe(
   data => {
     console.log("Retrieved credit card months: " + JSON.stringify(data));
     this.creditCardMonths = data;
   }
 );

 // populate credit card years

 this.ShopickFormServices.getCreditCardYears().subscribe(
   data => {
     console.log("Retrieved credit card years: " + JSON.stringify(data));
     this.creditCardYears = data;
   }
 );

}
  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
get lastName() { return this.checkoutFormGroup.get('customer.lastname');}
get email() { return this.checkoutFormGroup.get('customer.email');}
get phone() { return this.checkoutFormGroup.get('customer.phone'); }


get shippingAddressAddress() { return this.checkoutFormGroup.get('shippingAddress.address'); }
get shippingAddressDistrict() { return this.checkoutFormGroup.get('shippingAddress.district'); }
get shippingAddressSubDistrict() { return this.checkoutFormGroup.get('shippingAddress.subdistrict'); }
get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
get shippingAddressProvince() { return this.checkoutFormGroup.get('shippingAddress.province'); }

get billingAddressAddress() { return this.checkoutFormGroup.get('billingAddress.address'); }
get billingAddressDistrict() { return this.checkoutFormGroup.get('billingAddress.district'); }
get billingAddressSubDistrict() { return this.checkoutFormGroup.get('billingAddress.subdistrict'); }
get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
get billingAddressProvince() { return this.checkoutFormGroup.get('billingAddress.province'); }

get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }





  




  copyShippingAddressToBillingAddress(event:any){

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
    
  }

  onSubmit() {
    console.log("Handling the submit button");
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')!.value.email);
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.ShopickFormServices.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }
}
