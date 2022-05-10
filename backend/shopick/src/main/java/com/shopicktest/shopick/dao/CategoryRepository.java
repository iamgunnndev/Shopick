package com.shopicktest.shopick.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.shopicktest.shopick.entity.ProductCategory;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "categories" ,path = "categories")
public interface CategoryRepository extends JpaRepository<ProductCategory, Integer> {

}
