package com.quality.ecommerce.utils;

import com.quality.ecommerce.DTO.DiscountReqDTO;
import com.quality.ecommerce.entities.Discount;

public class DiscountMapper {

    // Convert Discount entity to DiscountReqDTO
    public static DiscountReqDTO ToDTO(Discount discount) {
        if (discount == null) {
            return null; // Handle null case if necessary
        }
        return new DiscountReqDTO(
                discount.getId(),
                discount.getDiscountName(),
                discount.getDiscountType(),
                discount.getDiscountValue(),
                discount.getStartDate(),
                discount.getEndDate(),
                discount.getImageUrl()
        );
    }

    // Convert DiscountReqDTO to Discount entity
    public static Discount ToEntity(DiscountReqDTO discountReqDTO) {
        if (discountReqDTO == null) {
            return null; // Handle null case if necessary
        }
        return new Discount(
                discountReqDTO.getDiscountName(),
                discountReqDTO.getDiscountType(),
                discountReqDTO.getDiscountValue(),
                discountReqDTO.getStartDate(),
                discountReqDTO.getEndDate(),
                discountReqDTO.getImageUrl()
        );
    }
}

