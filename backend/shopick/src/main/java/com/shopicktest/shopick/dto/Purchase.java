package com.shopicktest.shopick.dto;


import lombok.Data;

import java.util.Set;

import com.shopicktest.shopick.entity.Address;
import com.shopicktest.shopick.entity.Customer;
import com.shopicktest.shopick.entity.Order;
import com.shopicktest.shopick.entity.OrderItem;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
