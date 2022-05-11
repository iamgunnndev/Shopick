package com.shopicktest.shopick.dto;

import java.util.Set;

import com.shopicktest.shopick.entity.Product;
import com.shopicktest.shopick.entity.ProductCategory;

import lombok.Data;

@Data
public class addProduct {
 	
	private ProductCategory addProduct;
	private Set<Product> product;
}
