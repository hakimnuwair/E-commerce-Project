package com.quality.ecommerce.DTO;

import com.quality.ecommerce.enums.PaymentType;
import com.quality.ecommerce.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class OrderDetailsDTO {
    int userId;
    int orderId;
    String orderNumber;
    float totalAmount;
    float discountedAmount;
    float grossAmount;
    float shippingAmount;
    float netAmount;
    Status paymentStatus;
    PaymentType paymentType;
    String paymentTransactionId;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    List<OrderItemDTO> orderItemDTOList;
    ShippingAddressDTO shippingAddressDTO;
    List<OrderStatusHistoryDTO> orderStatusHistoryList;
}
