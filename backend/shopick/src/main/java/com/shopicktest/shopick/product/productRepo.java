package com.shopicktest.shopick.product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productRepo extends JpaRepository<product,Long> {
    
}
