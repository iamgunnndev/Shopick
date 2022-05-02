package com.shopicktest.shopick.product;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="product")
public class product {
    @Id
    private int id;

    @Column(name = "name")
    private String quanitity;

    @Column(name = "description")
    private String description;

    @Column(name = "catedoryID")
    private int catedoryID;

    @Column(name = "inventoryID")
    private int inventoryID;

    @Column(name = "price")
    private double price;

    @Column(name = "file_upload")
    private String file_upload;

    @Column(name = "created_at")
    private String created_at;

    public product() {
    
    }

    public product(int id, String quanitity, String description, int catedoryID, int inventoryID, double price,
            String file_upload, String created_at) {
        this.id = id;
        this.quanitity = quanitity;
        this.description = description;
        this.catedoryID = catedoryID;
        this.inventoryID = inventoryID;
        this.price = price;
        this.file_upload = file_upload;
        this.created_at = created_at;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuanitity() {
        return quanitity;
    }

    public void setQuanitity(String quanitity) {
        this.quanitity = quanitity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCatedoryID() {
        return catedoryID;
    }

    public void setCatedoryID(int catedoryID) {
        this.catedoryID = catedoryID;
    }

    public int getInventoryID() {
        return inventoryID;
    }

    public void setInventoryID(int inventoryID) {
        this.inventoryID = inventoryID;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getFile_upload() {
        return file_upload;
    }

    public void setFile_upload(String file_upload) {
        this.file_upload = file_upload;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    

    
    

   

    
}
