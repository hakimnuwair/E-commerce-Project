package com.quality.ecommerce.rest;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.quality.ecommerce.DTO.CategoryRespDTO;
import com.quality.ecommerce.DTO.DiscountReqDTO;
import com.quality.ecommerce.entities.Discount;
import com.quality.ecommerce.enums.DiscountType;
import com.quality.ecommerce.services.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/discount")
public class DiscountController {
    @Autowired
    Cloudinary cloudinary;

    @Autowired
    DiscountService discountService;

    @PostMapping("/")
    public ResponseEntity<?> addDiscount(@RequestHeader("Authorization") String token, @RequestParam("discountName") String discountName,
                                         @RequestParam("discountType") DiscountType discountType, @RequestParam("discountValue") float discountValue,
                                         @RequestParam("startDate") LocalDate startDate,
                                         @RequestParam("endDate") LocalDate endDate,
                                         @RequestParam("file")MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File must not be empty");
            }

            // Upload image to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap());

            String imageUrl = (String) uploadResult.get("secure_url");
            Discount discount = new Discount(discountName, discountType, discountValue, startDate, endDate, imageUrl);
            discountService.saveDiscount(discount);
            return new ResponseEntity<>("Discount added successfully", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<DiscountReqDTO>>  getDiscounts(){
        List<DiscountReqDTO> discounts = discountService.findAllDiscount();
        return ResponseEntity.ok(discounts);
    }

    @PutMapping("/")
    public ResponseEntity<?> UpdateCategory(@RequestHeader("Authorization") String token,@RequestBody DiscountReqDTO discountReqDTO){
        discountService.UpdateDiscount(discountReqDTO);
        return ResponseEntity.ok("Discount Updated Successfully");
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> DeleteCategory(@RequestHeader("Authorization") String token, @PathVariable int categoryId){
        discountService.deleteDiscount(categoryId);
        return ResponseEntity.ok("Category Delete Successfully");
    }
}
