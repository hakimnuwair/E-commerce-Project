package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Integer> {
    public List<ProductVariant> findAllByProductId(int productId);
}
