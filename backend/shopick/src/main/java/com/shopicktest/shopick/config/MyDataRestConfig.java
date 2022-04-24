package com.shopicktest.shopick.config;

import com.shopicktest.shopick.entity.Product;
import com.shopicktest.shopick.entity.ProductCategory;

import org.hibernate.boot.Metadata;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.HttpMethods;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        
        HttpMethod [] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE}; 

        //disable HTTP methods for Products: PUT , POST and DELETE
        config.getExposureConfiguration()
            .forDomainType(Product.class)
            .withItemExposure((metdada, HttpMethods)-> HttpMethods.disable(theUnsupportedActions))
            .withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions));


        //disable HTTP methods for ProductCategory: PUT , POST and DELETE
        config.getExposureConfiguration()
        .forDomainType(ProductCategory.class)
        .withItemExposure((metdada, HttpMethods)-> HttpMethods.disable(theUnsupportedActions))
        .withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions));
    }
    
    
}
