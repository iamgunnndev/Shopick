package com.shopicktest.shopick.controller;

import com.shopicktest.shopick.dto.Purchase;
import com.shopicktest.shopick.dto.PurchaseResponse;
import com.shopicktest.shopick.service.CheckoutService;


import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}
