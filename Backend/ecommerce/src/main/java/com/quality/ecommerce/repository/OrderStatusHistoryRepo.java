package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.orderEntities.OrderStatusHistroy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusHistoryRepo extends JpaRepository<OrderStatusHistroy, Integer> {
}
