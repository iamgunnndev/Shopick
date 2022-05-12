import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { ShopickFormService } from '../services/shopick-form.service';
import { ShopickValidators } from '../validators/shopick-validators';
import { render} from 'creditcardpayments/creditCardPayments'
import stripe from 'stripe';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';
import { any } from 'underscore';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

@ViewChild('paypal') paypalElement: ElementRef | undefined;

  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ShopickFormServices: ShopickFormService,
              private cartService: CartService,
              private checkoutService:CheckoutService,
              private router: Router) { 


            
              }
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  storage: Storage = sessionStorage;

     // initialize Stripe API
     stripe = Stripe(environment.stripePublishableKey);

     paymentInfo: PaymentInfo = new PaymentInfo();
     cardElement: any;
     displayError: any = "";
    isDisabled: boolean = false;        
     

  ngOnInit(): void {

    // setup Stripe payment form
    this.setupStripePaymentForm();

    this.reviewCartDetails();

// read the user's email address from browser storage
const theEmail = JSON.parse(this.storage.getItem('userEmail')!);      

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
        email: new FormControl(theEmail,
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

    });


}
  setupStripePaymentForm() {
    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // Create a card element ... and hide the zip-code field
    this.cardElement = elements.create('card', { hidePostalCode: true });

    // Add an instance of card UI component into the 'card-element' div
    this.cardElement.mount('#card-element');

    // Add event binding for the 'change' event on the card element
    this.cardElement.on('change', (event:any) => {

      // get a handle to card-errors element
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        // show validation error to customer
        this.displayError.textContent = event.error.message;
      }

    });
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

/*
get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
*/




  




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
 
         // compute payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "THB";
    this.paymentInfo.receiptEmail = purchase.customer.email;

     console.log(`this.paymentInfo.amount: ${this.paymentInfo.amount}`);
   
    
    // if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  email: purchase.customer.email,
                  name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
                  address: {
                    line1: purchase.billingAddress.address,
                    city: purchase.billingAddress.district,
                    line2: purchase.billingAddress.subdistrict,
                    country: purchase.billingAddress.province,
                    postal_code: purchase.billingAddress.zipCode,
                  }
                  }
              }
            }, { handleActions: false })
          .then(function(result: { error: { message: any; }; }) {
            if (result.error) {
              // inform the customer there was an error
              alert(`There was an error: ${result.error.message}`);
              this.isDisabled = false;
            } else {
              // call REST API via the CheckoutService
              this.checkoutService.placeOrder(purchase).subscribe({
                next: (response: { orderTrackingNumber: any; }) => {
                  alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

                  // reset cart
                  this.resetCart();
                  this.isDisabled = false;
                },
                error: (err: { message: any; }) => {
                  alert(`There was an error: ${err.message}`);
                  this.isDisabled = false;
                }
              })
            }            
          }.bind(this));
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
   }
 
   resetCart() {
     // reset cart data
     this.cartService.cartItems = [];
     this.cartService.totalPrice.next(0);
     this.cartService.totalQuantity.next(0);
     this.cartService.persistCartItems();
     
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
