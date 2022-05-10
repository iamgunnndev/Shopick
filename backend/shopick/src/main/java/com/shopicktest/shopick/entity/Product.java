package com.shopicktest.shopick.entity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "product")
@Data
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column (name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id" , nullable = false)
    private ProductCategory category;

    @Column (name = "sku")
    private String sku;

    @Column (name = "name")
    private String name;

    @Column (name = "description")
    private String description;

    @Column (name = "unit_price")
    private String unitPrice;

    @Column (name = "imageUrl")
    private String imageUrl;

    @Column (name = "active")
    private boolean active;

    @Column (name = "units_in_Stock")
    private int unitsInStock;

    @Column (name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column (name = "last_updated")
    @UpdateTimestamp
    private Date lastUpDate;
    
    
    
    
}
