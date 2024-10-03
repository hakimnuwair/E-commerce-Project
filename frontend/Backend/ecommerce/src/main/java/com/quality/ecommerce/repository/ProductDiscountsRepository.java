package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.ProductDiscounts;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface ProductDiscountsRepository extends JpaRepository<ProductDiscounts , Integer> {
    public ProductDiscounts findByProductId(int productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM ProductDiscounts pd WHERE pd.product.id = :productId")
    void deleteByProductId(@Param("productId") int productId);
}
