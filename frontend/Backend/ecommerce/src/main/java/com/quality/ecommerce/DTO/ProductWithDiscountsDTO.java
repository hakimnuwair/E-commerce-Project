package com.quality.ecommerce.DTO;

import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.enums.DiscountType;
import com.quality.ecommerce.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductWithDiscountsDTO {
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
    private DiscountType discountType;
    private float discountPercentage;
    private float discountValue;
    private float discountedAmount;
    private float discountedPrice;
    private ProductStatus status;


    public void setProduct(Product product){
        this.productId = product.getId();
        this.productName = product.getProductName();
        this.urlSlug = product.getUrlSlug();
        this.categoryId = product.getCategory().getId();
        this.categoryName = product.getCategory().getCategoryName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stockQuantity = product.getStockQuantity();
        this.imageUrl = product.getImageUrl();
        this.featured = product.isFeatured();
        this.status = product.getStatus();
    }
}
