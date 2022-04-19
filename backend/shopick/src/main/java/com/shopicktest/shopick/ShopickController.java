package com.shopicktest.shopick;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.shopicktest.shopick.Example.invenRepo;
import com.shopicktest.shopick.Example.inventory;
import com.shopicktest.shopick.user.Member;
import com.shopicktest.shopick.user.ShopickRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RestController
@RequestMapping("/shopick")
public class ShopickController {

    @Autowired
    private ShopickRepository repo;

    @Autowired
    private invenRepo repo2;

    @RequestMapping("/hello")
    public String hello(){
        return "hello!!!!";
    }

    @PostMapping("/register")
    public Member savemembers(@RequestBody Member mem) {
        return this.repo.save(mem);
    }

    @GetMapping("/member")
    public List<Member> AllMember(){
        return repo.findAll();
    }

    @GetMapping("/inventor")
    public List<inventory> Allinventory(){
        return repo2.findAll();
    }
    
}
