package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.CategoryRespDTO;
import com.quality.ecommerce.DTO.DiscountReqDTO;
import com.quality.ecommerce.entities.Category;
import com.quality.ecommerce.entities.Discount;
import com.quality.ecommerce.repository.DiscountRepository;
import com.quality.ecommerce.utils.DiscountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DiscountService {
    @Autowired
    DiscountRepository discountRepository;

    public Discount saveDiscount(Discount discount){
         return discountRepository.save(discount);
    }

    public List<DiscountReqDTO> findAllDiscount(){
        List<Discount> discounts = discountRepository.findAll();
        List<DiscountReqDTO> discountReqDTOS = new ArrayList<>();
        int i = 1;
        for(Discount discount : discounts){
            System.out.println("discount no.: " + i + " its id: " + discount.getId());
            discountReqDTOS.add(DiscountMapper.ToDTO(discount));
        }
        return discountReqDTOS;
    }

    public Discount findById(int discountId){
        Optional<Discount> result = discountRepository.findById(discountId);
        if(result.isPresent()){
            return result.get();
        }
        return null;
    }

    public Discount UpdateDiscount(DiscountReqDTO discountReqDTO) {
        Discount discount = findByIdHelper(discountReqDTO.getDiscountId());
        discount.setDiscountName(discountReqDTO.getDiscountName());
        discount.setDiscountType(discountReqDTO.getDiscountType());
        discount.setDiscountValue(discountReqDTO.getDiscountValue());
        discount.setStartDate(discountReqDTO.getStartDate());
        discount.setEndDate(discountReqDTO.getEndDate());
        discount.setImageUrl(discountReqDTO.getImageUrl());

        return discountRepository.save(discount);
    }

    public void deleteDiscount(int discountId){
        Discount discount = findByIdHelper(discountId);
        discountRepository.delete(discount);
    }

    private Discount findByIdHelper(int id){
        Optional<Discount> result = discountRepository.findById(id);
        Category category = new Category();
        if(result.isPresent()){
            return result.get();
        }else{
            throw new RuntimeException("Category not found for ID " + id);
        }
    }
}
