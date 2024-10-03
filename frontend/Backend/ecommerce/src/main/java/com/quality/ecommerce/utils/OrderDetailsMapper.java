package com.quality.ecommerce.utils;

import com.quality.ecommerce.DTO.*;
import com.quality.ecommerce.entities.orderEntities.Order;
import com.quality.ecommerce.entities.orderEntities.OrderItems;
import com.quality.ecommerce.entities.orderEntities.OrderStatusHistroy;
import com.quality.ecommerce.enums.PaymentType;
import com.quality.ecommerce.enums.Status;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class OrderDetailsMapper {
    public static OrderDetailsDTO toDTO(Order order){
        OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
        orderDetailsDTO.setUserId(order.getUser().getId());
        orderDetailsDTO.setOrderId(order.getId());
        orderDetailsDTO.setOrderNumber(order.getOrderNumber());
        orderDetailsDTO.setTotalAmount(order.getTotalAmount());
        orderDetailsDTO.setDiscountedAmount(order.getDiscountedAmount());
        orderDetailsDTO.setGrossAmount(order.getGrossAmount());
        orderDetailsDTO.setShippingAmount(order.getShippingAmount());
        orderDetailsDTO.setNetAmount(order.getNetAmount());
        orderDetailsDTO.setPaymentStatus(order.getStatus());
        orderDetailsDTO.setPaymentType(order.getPaymentType());
        orderDetailsDTO.setPaymentTransactionId(order.getPaymentTransactionId());
        orderDetailsDTO.setCreatedAt(order.getCreatedAt());
        orderDetailsDTO.setUpdatedAt(order.getUpdatedAt());
        List<OrderItemDTO> orderItemDTOList = new ArrayList<>();
        List<OrderItems> orderItems = order.getOrderItems();
        for(OrderItems orderItem : orderItems){
            orderItemDTOList.add(toOrderItemDTO(orderItem));
        }
        orderDetailsDTO.setOrderItemDTOList(orderItemDTOList);
        orderDetailsDTO.setShippingAddressDTO(ShippingAddressConverter.convertToDTO(order.getOrderShippingAddress().getAddress()));

        List<OrderStatusHistoryDTO> orderStatusHistoryDTOList = new ArrayList<>();
        for(OrderStatusHistroy statusHistroy : order.getOrderStatusHistroyList()){
            OrderStatusHistoryDTO orderStatusHistoryDTO = new OrderStatusHistoryDTO();
            orderStatusHistoryDTO.setDeliveryStatusStep(statusHistroy.getOrderDeliveryStatuses().getStatusId());
            orderStatusHistoryDTO.setStatusName(statusHistroy.getOrderDeliveryStatuses().getStatusName());
            orderStatusHistoryDTO.setUpdatedAt(statusHistroy.getUpdatedAt());
            orderStatusHistoryDTO.setUpdatedBy(statusHistroy.getUpdatedBy());
            orderStatusHistoryDTOList.add(orderStatusHistoryDTO);
        }
        orderDetailsDTO.setOrderStatusHistoryList(orderStatusHistoryDTOList);
        return orderDetailsDTO;
    }

    private static OrderItemDTO toOrderItemDTO(OrderItems orderItems){
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setProductId(orderItems.getProduct().getId());
        orderItemDTO.setProductName(orderItems.getProductName());
        orderItemDTO.setDescription(orderItems.getProduct().getDescription());
        orderItemDTO.setCategoryName(orderItems.getProduct().getCategory().getCategoryName());
        orderItemDTO.setDiscountType(orderItems.getDiscountType());
        orderItemDTO.setDiscountValue(orderItems.getDiscountValue());
        orderItemDTO.setDiscountedPrice(orderItems.getDiscountedPrice());
        orderItemDTO.setPrice(orderItems.getPrice());
        orderItemDTO.setQuantity(orderItems.getQuantity());
        orderItemDTO.setImageUrl(orderItems.getProduct().getImageUrl());
        orderItemDTO.setTotalAmount(orderItems.getTotalAmount());
        return orderItemDTO;
    }

//    public class OrderItemDTO {
//        private int productId;
//        private String productName;
//        private String categoryName;
//        private String description;
//        private float price;
//        private int quantity;
//        private String imageUrl;
//    }

//    public class OrderDetailsDTO {
//        int orderId;
//        String orderNumber;
//        float totalAmount;
//        float discountedAmount;
//        float grossAmount;
//        float shippingAmount;
//        float netAmount;
//        Status paymentStatus;
//        PaymentType paymentType;
//        String paymentTransactionId;
//        LocalDate createdAt;
//        LocalDate updatedAt;
//        List<ProductDTO> productDTOS;
//        ShippingAddressDTO shippingAddressDTO;
//    }
}
