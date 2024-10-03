package com.quality.ecommerce.rest;

import com.quality.ecommerce.DTO.ProductDiscountIdDTO;
import com.quality.ecommerce.entities.ProductDiscounts;
import com.quality.ecommerce.services.ProductDiscountsService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product-discount")
public class ProductDiscountController {
    @Autowired
    private ProductDiscountsService productDiscountsService;

    @PostMapping("/")
    public ResponseEntity<?> applyDiscount(@RequestHeader("Authorization") String token,@RequestBody ProductDiscountIdDTO productDiscountIdDTO){
        System.out.println("productId " + productDiscountIdDTO.getProductId());
        ProductDiscounts saveddProductDiscount = productDiscountsService.save(productDiscountIdDTO);
        if(saveddProductDiscount == null){
            return new ResponseEntity<>("Product or discount not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Discount Applied Successfully", HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<?> updateDiscount(@RequestHeader("Authorization") String token, @RequestBody ProductDiscountIdDTO productDiscountIdDTO){
        productDiscountsService.update(productDiscountIdDTO);
        return new ResponseEntity<String>("Discount Updated Successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeDiscount(@RequestHeader("Authorization") String token, @PathVariable int productId){
        try {
            productDiscountsService.removeDiscount(productId);
            return new ResponseEntity<>("Discount removed successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("No discount found for the specified product ID", HttpStatus.NOT_FOUND);
        }
    }
 }
