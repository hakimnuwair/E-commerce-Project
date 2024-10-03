package com.quality.ecommerce.rest;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.quality.ecommerce.DTO.CategoryRespDTO;
import com.quality.ecommerce.entities.Category;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.services.CategoryService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/category")
@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private Cloudinary cloudinary;

    @GetMapping("/")
    public ResponseEntity<List<CategoryRespDTO>> getAllCategory(){
        List<CategoryRespDTO> categories = categoryService.findAllCategory();
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/")
    public ResponseEntity<?> saveCategory(@RequestHeader("Authorization") String token, @RequestParam("file")MultipartFile file
            ,@RequestParam("categoryName") String categoryName){
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File must not be empty");
            }
            // Upload image to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap());
            String imageUrl = (String) uploadResult.get("secure_url");
            Category category = new Category(categoryName, imageUrl);
            categoryService.saveCategory(category);
            return ResponseEntity.ok("File uploaded successfully: ");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file: " + e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> UpdateCategory(@RequestHeader("Authorization") String token,@RequestBody CategoryRespDTO categoryRespDTO){
        categoryService.UpdateCategory(categoryRespDTO);
        return ResponseEntity.ok("Category Updated Successfully");
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> DeleteCategory(@RequestHeader("Authorization") String token, @PathVariable int categoryId){
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category Delete Successfully");
    }
}
