package com.shopicktest.shopick.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    @Autowired
    private productRepo repoProduct;

    @GetMapping("/getproduct")
    public List<product> getProduct(){
        return this.repoProduct.findAll();
    }

    @PostMapping("/uploadProduct")
    public product uploadProduct(@RequestBody product product){
        return this.repoProduct.save(product);
    }
}
