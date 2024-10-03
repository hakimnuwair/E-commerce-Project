package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId AND c.product.status = 'active'")
    public List<Cart> findByUser_id(@Param("userId") int userId);
    public Cart findByUserIdAndProductId(int userId, int productId);
    public void deleteByUserIdAndProductId(int userId, int productId);
}
