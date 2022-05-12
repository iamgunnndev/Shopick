package com.shopicktest.shopick.service;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import com.shopicktest.shopick.dao.CustomerRepository;
import com.shopicktest.shopick.dto.PaymentInfo;
import com.shopicktest.shopick.dto.Purchase;
import com.shopicktest.shopick.dto.PurchaseResponse;
import com.shopicktest.shopick.entity.Customer;
import com.shopicktest.shopick.entity.Order;
import com.shopicktest.shopick.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;



import java.util.*;


@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;
    private String secretKey = "sk_test_51KyIjYFiHB1g7IWuvIYr1TgRcOKRBUoNalHKapx5keDCwgJy0Lyl6ZXdofjarYCSA49BKSmOG5ow39FeHJeFyb1f00uQ0NpLE7";

    public CheckoutServiceImpl(CustomerRepository customerRepository) {

        this.customerRepository = customerRepository;

        // initialize Stripe API with secret key
        Stripe.apiKey = secretKey;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();

            // check if this is an existing customer
            String theEmail = customer.getEmail();

            Customer customerFromDB = customerRepository.findByEmail(theEmail);
    
            if (customerFromDB != null) {
                // we found them ... let's assign them accordingly
                customer = customerFromDB;
            }

        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }
    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException{

        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("description", "SHOPICK Purchase");
        params.put("receipt_email", paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }
    private String generateOrderTrackingNumber() {

        // generate a random UUID number (UUID version-4)
        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        //
        return UUID.randomUUID().toString();
    }


}









