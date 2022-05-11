package com.shopicktest.shopick.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name="address")
@Getter
@Setter

public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="address")
    private String address;

    @Column(name="district")
    private String district;

    @Column(name="subdistrict")
    private String subdistrict;

    @Column(name="province")
    private String province;

    @Column(name="zip_code")
    private String zipCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;
}