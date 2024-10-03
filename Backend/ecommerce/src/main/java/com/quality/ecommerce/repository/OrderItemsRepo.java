package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.orderEntities.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemsRepo extends JpaRepository<OrderItems, Integer> {
}
