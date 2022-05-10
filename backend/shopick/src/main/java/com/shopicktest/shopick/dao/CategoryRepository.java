package com.shopicktest.shopick.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopicktest.shopick.entity.ProductCategory;

public interface CategoryRepository extends JpaRepository<ProductCategory, Integer> {

}
