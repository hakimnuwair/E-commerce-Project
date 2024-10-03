package com.quality.ecommerce.DTO;


import com.quality.ecommerce.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CartItemsDTO {
    private ProductDTO product;
    private int quantity;
}
