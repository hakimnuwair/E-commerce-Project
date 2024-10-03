package com.quality.ecommerce.services.OrderServices;

import com.quality.ecommerce.entities.orderEntities.Order;
import com.quality.ecommerce.entities.orderEntities.OrderDeliveryStatuses;
import com.quality.ecommerce.entities.orderEntities.OrderStatusHistroy;
import com.quality.ecommerce.repository.OrderStatusHistoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderStatusHistoryService {
    @Autowired
    private OrderStatusHistoryRepo orderStatusHistoryRepo;

    public OrderStatusHistroy add(Order order, OrderDeliveryStatuses orderDeliveryStatuses,String updatedBy){
        OrderStatusHistroy orderStatusHistroy = new OrderStatusHistroy();
        orderStatusHistroy.setOrder(order);
        orderStatusHistroy.setOrderDeliveryStatuses(orderDeliveryStatuses);
        orderStatusHistroy.setUpdatedBy(updatedBy);
        return orderStatusHistoryRepo.save(orderStatusHistroy);
    }
}
