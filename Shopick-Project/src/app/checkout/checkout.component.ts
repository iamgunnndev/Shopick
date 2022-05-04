import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
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
              private cartService: CartService,
              private checkoutService:CheckoutService,
              private router: Router) { }
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
                                [Validators.required, Validators.pattern('[- +()0-9]{10}'),
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
      return;
    }
     // set up order
     let order = new Order();
     order.totalPrice = this.totalPrice;
     order.totalQuantity = this.totalQuantity;
 
     // get cart items
     const cartItems = this.cartService.cartItems;
 
     // create orderItems from cartItems
     // - long way
     /*
     let orderItems: OrderItem[] = [];
     for (let i=0; i < cartItems.length; i++) {
       orderItems[i] = new OrderItem(cartItems[i]);
     }
     */
 
     // - short way of doing the same thingy
     let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
 
     // set up purchase
     let purchase = new Purchase();
     
     // populate purchase - customer
     purchase.customer = this.checkoutFormGroup.controls['customer'].value;
     
     // populate purchase - shipping address
     purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

 
     // populate purchase - billing address
     purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;

   
     // populate purchase - order and orderItems
     purchase.order = order;
     purchase.orderItems = orderItems;
 
     // call REST API via the CheckoutService
     this.checkoutService.placeOrder(purchase).subscribe({
         next: response => {
           alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
 
           // reset cart
           this.resetCart();
 
         },
         error: err => {
           alert(`There was an error: ${err.message}`);
         }
       }
     );
 
   }
 
   resetCart() {
     // reset cart data
     this.cartService.cartItems = [];
     this.cartService.totalPrice.next(0);
     this.cartService.totalQuantity.next(0);
     
     // reset the form
     this.checkoutFormGroup.reset();
 
     // navigate back to the products page
     this.router.navigateByUrl("/products");
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
