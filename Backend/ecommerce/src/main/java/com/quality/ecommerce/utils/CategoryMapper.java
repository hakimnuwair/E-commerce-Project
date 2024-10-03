package com.quality.ecommerce.utils;

import com.quality.ecommerce.DTO.CategoryRespDTO;
import com.quality.ecommerce.entities.Category;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public class CategoryMapper {
    public static CategoryRespDTO TODto(Category category){
        CategoryRespDTO categoryRespDTO = new CategoryRespDTO();
        categoryRespDTO.setCategoryId(category.getId());
        categoryRespDTO.setCategoryName(category.getCategoryName());
        categoryRespDTO.setImageUrl(category.getImageUrl());
        return categoryRespDTO;
    }
}
