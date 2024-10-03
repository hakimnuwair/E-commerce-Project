package com.quality.ecommerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShippingAddressDTO {
    private int id;

    private int userId;

    private String fullAddress;

    private String state;

    private String city;

    private String mobileNo;

    private String pinCode;
}
