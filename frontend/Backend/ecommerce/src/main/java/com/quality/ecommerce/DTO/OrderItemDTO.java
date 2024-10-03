package com.quality.ecommerce.DTO;

import com.quality.ecommerce.enums.DiscountType;
import com.quality.ecommerce.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderItemDTO {
    private int productId;
    private String productName;
    private String categoryName;
    private String description;
    private DiscountType discountType = null;
    private float discountValue = 0;
    private float discountedPrice = 0;
    private float price;
    private int quantity;
    private float totalAmount;
    private String imageUrl;
}
