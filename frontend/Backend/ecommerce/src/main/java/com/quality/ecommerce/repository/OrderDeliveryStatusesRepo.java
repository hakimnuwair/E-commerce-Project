package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.orderEntities.OrderDeliveryStatuses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDeliveryStatusesRepo  extends JpaRepository<OrderDeliveryStatuses, Integer> {
    public OrderDeliveryStatuses findByStatusId(int statusId);
}
