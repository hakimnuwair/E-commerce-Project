package com.quality.ecommerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CartRequest {
    private int productId;
    private int quantity;
}
