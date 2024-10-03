package com.quality.ecommerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantResponseDTO {
    int variantId;
    int productId;
    String color;
    String size;
    float price;
    int stockQuantity;
    String imageUrl;
}
