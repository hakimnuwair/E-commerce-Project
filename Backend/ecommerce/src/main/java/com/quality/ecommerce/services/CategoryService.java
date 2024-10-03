package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.CategoryRespDTO;
import com.quality.ecommerce.entities.Category;
import com.quality.ecommerce.repository.CategoryRepository;
import com.quality.ecommerce.utils.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(Category category){
        return categoryRepository.save(category);
    }

    public Category findCategory(int categoryId){
        Optional<Category> result = categoryRepository.findById(categoryId);
        if(result.isPresent()){
            return result.get();
        }
        return null;
    }

    public List<CategoryRespDTO> findAllCategory(){
        List<Category> categories = categoryRepository.findAll();
        List<CategoryRespDTO> categoryRespDTOS = new ArrayList<>();
        for(Category category : categories){
            categoryRespDTOS.add(CategoryMapper.TODto(category));
        }
        return categoryRespDTOS;
    }

    public Category UpdateCategory(CategoryRespDTO categoryRespDTO) {
        Category category = findByIdHelper(categoryRespDTO.getCategoryId());
        category.setCategoryName(categoryRespDTO.getCategoryName());
        category.setImageUrl(categoryRespDTO.getImageUrl());
        return categoryRepository.save(category);
    }

    public void deleteCategory(int categoryId){
        Category category = findByIdHelper(categoryId);
        categoryRepository.delete(category);
    }

    private Category findByIdHelper(int id){
        Optional<Category> result = categoryRepository.findById(id);
        Category category = new Category();
        if(result.isPresent()){
            return result.get();
        }else{
            throw new RuntimeException("Category not found for ID " + id);
        }
    }
}
