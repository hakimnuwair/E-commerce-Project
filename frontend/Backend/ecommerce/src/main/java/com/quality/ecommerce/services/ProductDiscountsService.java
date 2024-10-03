package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.ProductDiscountIdDTO;
import com.quality.ecommerce.entities.Discount;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.ProductDiscounts;
import com.quality.ecommerce.repository.ProductDiscountsRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDiscountsService {
    @Autowired
    ProductDiscountsRepository productDiscountsRepo;
    @Autowired
    ProductService productService;
    @Autowired
    DiscountService discountService;

    public ProductDiscounts findProductDiscountsByProductId(int productId){
        return productDiscountsRepo.findByProductId(productId);
    }

    public ProductDiscounts save(ProductDiscountIdDTO productDiscountId){
        Product product = productService.findProductById(productDiscountId.getProductId());
        Discount discount = discountService.findById(productDiscountId.getDiscountId());
        if(discount == null){
            return null;
        }
        if(product == null){
            return null;
        }
        ProductDiscounts productDiscounts = new ProductDiscounts(product,discount);
        return productDiscountsRepo.save(productDiscounts);
    }

    public ProductDiscounts update(ProductDiscountIdDTO productDiscountIdDTO) {
        Product product = productService.findProductById(productDiscountIdDTO.getProductId());
        if (product == null) {
            throw new EntityNotFoundException("Product not found for ID: " + productDiscountIdDTO.getProductId());
        }

        Discount discount = discountService.findById(productDiscountIdDTO.getDiscountId());
        if (discount == null) {
            throw new EntityNotFoundException("Discount not found for ID: " + productDiscountIdDTO.getDiscountId());
        }

        ProductDiscounts productDiscounts = productDiscountsRepo.findByProductId(productDiscountIdDTO.getProductId());

        if (productDiscounts == null) {
            productDiscounts = new ProductDiscounts(product, discount);
        } else {
            productDiscounts.setDiscount(discount);
        }

        return productDiscountsRepo.save(productDiscounts);
    }

    @Transactional
    public void removeDiscount(int productId) {
        ProductDiscounts productDiscounts = productDiscountsRepo.findByProductId(productId);
        if (productDiscounts != null) {
            System.out.println("Deleting ProductDiscounts entity: " + productDiscounts);
            productDiscountsRepo.deleteByProductId(productId);
        } else {
            throw new EntityNotFoundException("No discount found for the product with ID: " + productId);
        }
    }

}
