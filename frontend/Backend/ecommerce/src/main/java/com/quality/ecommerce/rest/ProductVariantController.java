package com.quality.ecommerce.rest;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.quality.ecommerce.DTO.ProductVariantDTO;
import com.quality.ecommerce.DTO.ProductVariantResponseDTO;
import com.quality.ecommerce.services.ProductVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/product_variants")
@RestController
public class ProductVariantController {
    @Autowired
    private ProductVariantService productVariantService;

    @Autowired
    Cloudinary cloudinary;

    @PostMapping("/")
    public ResponseEntity<?> addVariant(
            @RequestHeader("Authorization") String token,
            @RequestParam("productId") int productId,
            @RequestParam("color") String color,
            @RequestParam("size") String size,
            @RequestParam("price") float price,
            @RequestParam("stockQuantity") int stockQuantity,
            @RequestParam("file") MultipartFile file) throws IOException {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File must not be empty");
            }

            // Upload image to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap());

            String imageUrl = (String) uploadResult.get("secure_url");
            System.out.println("image url: " + imageUrl);

            // Create a ProductVariantDTO from the received parts
            ProductVariantDTO productVariantDTO = new ProductVariantDTO(
                    productId,
                    color,
                    size,
                    price,
                    stockQuantity,
                    imageUrl
            );
        productVariantService.addProductVariant(productVariantDTO);
            return ResponseEntity.ok("Variant Added Successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file: " + e.getMessage());
        }
    }

    @GetMapping("/{productId}")
    public List<ProductVariantResponseDTO> getAllVariants(@PathVariable int productId){
        return productVariantService.findAllVariants(productId);
    }
};