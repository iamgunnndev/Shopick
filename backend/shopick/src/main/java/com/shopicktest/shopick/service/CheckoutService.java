package com.shopicktest.shopick.service;

import com.shopicktest.shopick.dto.PaymentInfo;
import com.shopicktest.shopick.dto.Purchase;
import com.shopicktest.shopick.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
    
    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
