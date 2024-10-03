package com.quality.ecommerce.rest;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.quality.ecommerce.DTO.ProductDTO;
import com.quality.ecommerce.DTO.ProductVariantDTO;
import com.quality.ecommerce.DTO.ProductWithDiscountsDTO;
import com.quality.ecommerce.entities.Category;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.enums.ProductStatus;
import com.quality.ecommerce.services.CategoryService;
import com.quality.ecommerce.services.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class MainRestController {
    @Autowired
    private ProductService productService;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private CategoryService categoryService;


    @Autowired
    public MainRestController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping("/uploads")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file,
                                              @RequestParam("productName") String productName,
                                              @RequestParam("urlSlug") String urlSlug,
                                              @RequestParam("categoryId") int categoryId,
                                              @RequestParam("description") String description,
                                              @RequestParam(value = "featured", required = false) boolean featured,
                                              @RequestParam("price") float price,
                                              @RequestParam("stockQuantity") int stockQuantity,
                                              @RequestParam("status") ProductStatus status) {



        System.out.println("status: " + (status == ProductStatus.active));

        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File must not be empty");
            }

            // Upload image to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap());

            String imageUrl = (String) uploadResult.get("secure_url");

            Category category = categoryService.findCategory(categoryId);
            if(category == null){
                return new ResponseEntity<>("Category not found",HttpStatus.NOT_FOUND);
            }

            Product product = new Product(productName, urlSlug, category, description, featured, price, stockQuantity, imageUrl, status);
             productService.saveProduct(product);

            return ResponseEntity.ok("File uploaded successfully: ");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file: " + e.getMessage());
        }
    }


    @GetMapping("/")
    public List<ProductWithDiscountsDTO> getProducts() {
        return productService.getProductsWithDiscount();
    }

    @GetMapping("/{productId}")
    public ProductWithDiscountsDTO getProductById(@PathVariable int productId){
        return productService.findProductWithDiscountById(productId);
    }

    @GetMapping("/active-featured")
    public List<ProductWithDiscountsDTO> getFetauredProducts(){
        return productService.findActiveFeaturedProducts();
    }

    @GetMapping("/active-featured-selected")
    public List<ProductWithDiscountsDTO> getSelectedFetauredProducts(){
        return productService.findSelectedActiveFeaturedProducts();
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductWithDiscountsDTO>> getProducts(@PathVariable int categoryId){
        List<ProductWithDiscountsDTO> products = productService.findProductsByCategoryId(categoryId);
        if(products == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }else{
            return ResponseEntity.ok(products);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductWithDiscountsDTO> updateProduct(@PathVariable int id, @RequestBody ProductDTO updateProductDTO) {
        System.out.println("update this: " + updateProductDTO.getProductName());
        ProductWithDiscountsDTO savedProduct = productService.updateProduct(id,updateProductDTO);
        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productId){
        productService.deleteProduct(productId);
        return new ResponseEntity<>("Product Deleted.",HttpStatus.OK);
    }

}
