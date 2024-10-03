package com.quality.ecommerce.DTO;

import com.quality.ecommerce.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private int productId;
    private String productName;
    private String urlSlug;
    private int categoryId;
    private String categoryName;
    private String description;
    private boolean featured;
    private float price;
    private int stockQuantity;
    private String imageUrl;
    private ProductStatus status;
}
