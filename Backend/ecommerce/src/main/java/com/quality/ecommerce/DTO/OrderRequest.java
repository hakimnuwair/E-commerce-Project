package com.quality.ecommerce.DTO;

import com.quality.ecommerce.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderRequest {
    private List<CartItemsWithDiscountDTO> product;
    private PaymentType paymentMethod;
    private ShippingAddressDTO shippingAddressDTO;
}
