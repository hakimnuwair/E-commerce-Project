package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.orderEntities.OrderShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderShippingAddressesRepo extends JpaRepository<OrderShippingAddress, Integer> {
}
