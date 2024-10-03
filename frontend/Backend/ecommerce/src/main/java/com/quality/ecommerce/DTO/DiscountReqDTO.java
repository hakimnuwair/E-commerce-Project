package com.quality.ecommerce.DTO;

import com.quality.ecommerce.enums.DiscountType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DiscountReqDTO {
    private int discountId;
    private String discountName;
    private DiscountType discountType;
    private float discountValue;
    private LocalDate startDate;
    private LocalDate endDate;
    private String imageUrl;
}
