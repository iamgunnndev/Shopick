package com.shopicktest.shopick.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="inventory")
public class inventory {
    @Id
    private int id;

    @Column(name = "quanitity")
    private int quanitity;

    public inventory(int id, int quanitity) {
        this.id = id;
        this.quanitity = quanitity;
    }

    public inventory(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuanitity() {
        return quanitity;
    }

    public void setQuanitity(int quanitity) {
        this.quanitity = quanitity;
    }

    
}
