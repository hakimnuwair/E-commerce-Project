package com.quality.ecommerce.DTO;

import com.quality.ecommerce.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private float totalAmount;
    private float discount;
    private float shippingAmount;
    private PaymentType paymentType;
}
