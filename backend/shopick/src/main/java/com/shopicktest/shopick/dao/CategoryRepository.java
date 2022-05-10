package com.shopicktest.shopick.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import com.shopicktest.shopick.entity.ProductCategory;



@RepositoryRestResource(collectionResourceRel = "categories" ,path = "categories")
public interface CategoryRepository extends JpaRepository<ProductCategory, Integer> {

}
