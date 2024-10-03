package com.quality.ecommerce.utils;

import com.quality.ecommerce.DTO.ShippingAddressDTO;
import com.quality.ecommerce.entities.orderEntities.ShippingAddress;

public class ShippingAddressConverter {
    public static ShippingAddress convertToEntity(ShippingAddressDTO shippingAddressDTO) {
        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setFullAddress(shippingAddressDTO.getFullAddress());
        shippingAddress.setState(shippingAddressDTO.getState());
        shippingAddress.setCity(shippingAddressDTO.getCity());
        shippingAddress.setPinCode(shippingAddressDTO.getPinCode());
        shippingAddress.setMobileNo(shippingAddressDTO.getMobileNo());
        return shippingAddress;
    }

    public static ShippingAddressDTO convertToDTO(ShippingAddress shippingAddress) {
        ShippingAddressDTO shippingAddressDTO = new ShippingAddressDTO();
        shippingAddressDTO.setFullAddress(shippingAddress.getFullAddress());
        shippingAddressDTO.setState(shippingAddress.getState());
        shippingAddressDTO.setCity(shippingAddress.getCity());
        shippingAddressDTO.setPinCode(shippingAddress.getPinCode());
        shippingAddressDTO.setMobileNo(shippingAddress.getMobileNo());
        return shippingAddressDTO;
    }
}
