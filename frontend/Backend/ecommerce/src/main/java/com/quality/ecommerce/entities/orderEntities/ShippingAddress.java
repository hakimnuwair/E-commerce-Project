package com.quality.ecommerce.entities.orderEntities;

import com.quality.ecommerce.entities.authenticationEntities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "shipping_addresses")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShippingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_address")
    private String fullAddress;
    @Column(name = "state")
    private String state;
    @Column(name = "city")
    private String city;
    @Column(name = "mobile_number")
    private String mobileNo;
    @Column(name = "pin_code")
    private String pinCode;

    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderShippingAddress> orderShippingAddress;
}
