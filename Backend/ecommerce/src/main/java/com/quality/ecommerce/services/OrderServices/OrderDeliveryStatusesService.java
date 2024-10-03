package com.quality.ecommerce.services.OrderServices;

import com.quality.ecommerce.entities.orderEntities.OrderDeliveryStatuses;
import com.quality.ecommerce.repository.OrderDeliveryStatusesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderDeliveryStatusesService {
    @Autowired
    private OrderDeliveryStatusesRepo orderDeliveryStatusesRepo;

    public OrderDeliveryStatuses find(int statusId){
        OrderDeliveryStatuses orderDeliveryStatuses = orderDeliveryStatusesRepo.findByStatusId(statusId);
        return orderDeliveryStatuses;
    }
}
