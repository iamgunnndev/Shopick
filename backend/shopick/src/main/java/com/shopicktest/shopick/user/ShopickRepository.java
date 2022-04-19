package com.shopicktest.shopick.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopickRepository extends JpaRepository<Member,Long> {
    
}
