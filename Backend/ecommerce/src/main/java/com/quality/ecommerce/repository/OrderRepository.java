package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.orderEntities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    public List<Order> findByUserId(int userId);
}
