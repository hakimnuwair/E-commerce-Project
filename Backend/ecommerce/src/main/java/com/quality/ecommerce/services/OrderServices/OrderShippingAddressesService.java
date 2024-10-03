package com.quality.ecommerce.services.OrderServices;

import com.quality.ecommerce.DTO.ShippingAddressDTO;
import com.quality.ecommerce.entities.orderEntities.Order;
import com.quality.ecommerce.entities.orderEntities.OrderShippingAddress;
import com.quality.ecommerce.entities.orderEntities.ShippingAddress;
import com.quality.ecommerce.repository.OrderShippingAddressesRepo;
import com.quality.ecommerce.utils.ShippingAddressConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderShippingAddressesService {
    @Autowired
    private OrderShippingAddressesRepo orderShippingAddressesRepo;
    @Autowired
    private ShippingAddressService shippingAddressService;

    public OrderShippingAddress addOrderShippingAddress(Order order, ShippingAddress shippingAddress){
        OrderShippingAddress orderShippingAddress = new OrderShippingAddress();
        orderShippingAddress.setOrder(order);
        orderShippingAddress.setAddress(shippingAddress);

        return orderShippingAddressesRepo.save(orderShippingAddress);
    }
}
