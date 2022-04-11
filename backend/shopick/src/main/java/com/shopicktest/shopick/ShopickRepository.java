package com.shopicktest.shopick;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopickRepository extends JpaRepository<Member,Long> {
    
}
