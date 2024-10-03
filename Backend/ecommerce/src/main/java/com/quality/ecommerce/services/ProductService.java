package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.ProductDTO;
import com.quality.ecommerce.DTO.ProductWithDiscountsDTO;
import com.quality.ecommerce.entities.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts();
    List<ProductWithDiscountsDTO> getProductsWithDiscount();
    Product saveProduct(Product product);
    Product findProductById(int productId);
    ProductWithDiscountsDTO findProductWithDiscountById(int productId);
    List<ProductWithDiscountsDTO> findProductsByCategoryId(int categoryId);
    List<ProductWithDiscountsDTO> findFeaturedProducts();
    List<ProductWithDiscountsDTO> findActiveFeaturedProducts();
    void deleteProduct(int id);
    ProductWithDiscountsDTO updateProduct(int id, ProductDTO productDTO);
    List<ProductWithDiscountsDTO> findSelectedActiveFeaturedProducts();
}
