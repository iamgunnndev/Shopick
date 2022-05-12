package com.shopicktest.shopick.dto;

import lombok.Data;

@Data
public class PaymentInfo {

    private int Amount;
    private String Currency;
    private String receiptEmail;

}
