package com.shopicktest.shopick.service;

import com.shopicktest.shopick.dto.Purchase;
import com.shopicktest.shopick.dto.PurchaseResponse;

public interface CheckoutService {
    
    PurchaseResponse placeOrder(Purchase purchase);
}
