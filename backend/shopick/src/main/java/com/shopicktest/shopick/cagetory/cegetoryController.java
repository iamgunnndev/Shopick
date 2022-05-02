package com.shopicktest.shopick.cagetory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
/*import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;*/
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class cegetoryController {
    @Autowired
    private cegetoryRepo repo;

    @GetMapping("/getCagetories")
    public List<cagetory> getCagetory(){
        return this.repo.findAll();
    }

    /*@PostMapping("/uploadProduct")
    public cagetory uploadProduct(@RequestBody cagetory cagetory){
        return this.repo.save(cagetory);
    }*/
}
