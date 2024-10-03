package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.enums.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId AND p.stockQuantity > 0")
    List<Product> findByCategoryId(@Param("categoryId") int categoryId);

    @Query("SELECT p FROM Product p WHERE p.featured = true AND p.stockQuantity > 0")
    List<Product> findByFeaturedTrue();

    @Query("SELECT p FROM Product p WHERE p.featured = true AND p.status = :productStatus AND p.stockQuantity > 0")
    List<Product> findByFeaturedTrueAndStatus(@Param("productStatus") ProductStatus productStatus);

    @Query("SELECT p FROM Product p WHERE p.featured = true AND p.status = :productStatus AND p.stockQuantity > 0")
    Page<Product> findByFeaturedTrueAndStatus(@Param("productStatus") ProductStatus status, Pageable pageable);
}
