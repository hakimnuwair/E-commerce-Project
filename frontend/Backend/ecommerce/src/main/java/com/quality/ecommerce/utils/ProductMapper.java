package com.quality.ecommerce.utils;

import com.quality.ecommerce.DTO.ProductDTO;
import com.quality.ecommerce.entities.Category;
import com.quality.ecommerce.entities.Product;
import org.springframework.security.core.parameters.P;

public class ProductMapper {
    public static ProductDTO toDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getProductName(),
                product.getUrlSlug(),
                product.getCategory().getId(),
                product.getCategory().getCategoryName(),
                product.getDescription(),
                product.isFeatured(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getImageUrl(),
                product.getStatus()
        );
    }

    public static Product toEntity(ProductDTO productDTO, Category category) {
        Product product = new Product();
        product.setId(productDTO.getProductId());
        product.setProductName(productDTO.getProductName());
        product.setUrlSlug(productDTO.getUrlSlug());
        product.setCategory(category);
        product.setDescription(productDTO.getDescription());
        product.setFeatured(productDTO.isFeatured());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setImageUrl(productDTO.getImageUrl());
        product.setStatus(productDTO.getStatus());

        return product;
    }
}
