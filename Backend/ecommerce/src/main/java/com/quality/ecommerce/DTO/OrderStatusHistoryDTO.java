package com.quality.ecommerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderStatusHistoryDTO {
    int deliveryStatusStep;
    String statusName;
    Timestamp updatedAt;
    String updatedBy;
}
