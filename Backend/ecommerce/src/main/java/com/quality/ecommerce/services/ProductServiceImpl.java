package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.ProductDTO;
import com.quality.ecommerce.DTO.ProductWithDiscountsDTO;
import com.quality.ecommerce.entities.Category;
import com.quality.ecommerce.entities.Discount;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.ProductDiscounts;
import com.quality.ecommerce.enums.DiscountType;
import com.quality.ecommerce.enums.ProductStatus;
import com.quality.ecommerce.repository.ProductDiscountsRepository;
import com.quality.ecommerce.repository.ProductRepository;
import com.quality.ecommerce.utils.Pair;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.quality.ecommerce.utils.ProductDiscountsUtils.builProductWithDiscountsDTO;
import static com.quality.ecommerce.utils.ProductDiscountsUtils.buildProductWithDiscountsDTOList;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductDiscountsRepository productDiscountsRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public List<ProductWithDiscountsDTO> getProductsWithDiscount() {
        List<Product> products = productRepository.findAll();
        return buildProductWithDiscountsDTOList(products, productDiscountsRepository);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product findProductById(int productId){
        Optional<Product> result = productRepository.findById(productId);
        Product product = null;
        if(result.isPresent()){
            return result.get();
        }else{
            throw new RuntimeException("Product not found" + productId);
        }
    }

    public ProductWithDiscountsDTO findProductWithDiscountById(int productId){
        Optional<Product> result = productRepository.findById(productId);
        Product product = null;
        if(result.isPresent()){
            product = result.get();
        }else{
            throw new RuntimeException("Product not found" + productId);
        }
        return builProductWithDiscountsDTO(product, productDiscountsRepository);
    }


    public List<ProductWithDiscountsDTO> findProductsByCategoryId(int categoryId){
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return buildProductWithDiscountsDTOList(products,productDiscountsRepository);
    }

    public List<ProductWithDiscountsDTO> findFeaturedProducts(){
        List<Product> products = productRepository.findByFeaturedTrue();
        return buildProductWithDiscountsDTOList(products,productDiscountsRepository);
    }

    public List<ProductWithDiscountsDTO> findActiveFeaturedProducts(){
        List<Product> products = productRepository.findByFeaturedTrueAndStatus(ProductStatus.active);
        return buildProductWithDiscountsDTOList(products,productDiscountsRepository);
    }

    // Fetch 5 selected active and featured products
    public List<ProductWithDiscountsDTO> findSelectedActiveFeaturedProducts() {
        Pageable pageable = PageRequest.of(0, 5);  // Fetch the first page with 5 items
        List<Product> products = productRepository.findByFeaturedTrueAndStatus(ProductStatus.active, pageable).getContent();
        return buildProductWithDiscountsDTOList(products, productDiscountsRepository);
    }

    public ProductWithDiscountsDTO updateProduct(int id, ProductDTO updateProductDTO) {
        // Manually copy fields from updatedProduct to existingProduct
        Optional<Product> result = productRepository.findById(id);
        Product existingProduct = null;

        if(result.isPresent()){
            existingProduct = result.get();
        }else{
            throw new RuntimeException("Product not found" + updateProductDTO.getProductId());
        }

        Category category = categoryService.findCategory(updateProductDTO.getCategoryId());
        if(category == null){
            throw new EntityNotFoundException("Category not found");
        }

        existingProduct.setProductName(updateProductDTO.getProductName());
        existingProduct.setDescription(updateProductDTO.getDescription());
        existingProduct.setUrlSlug(updateProductDTO.getUrlSlug());
        existingProduct.setCategory(category);
        existingProduct.setPrice(updateProductDTO.getPrice());
        existingProduct.setStockQuantity(updateProductDTO.getStockQuantity());
        existingProduct.setFeatured(updateProductDTO.isFeatured());
        existingProduct.setStatus(updateProductDTO.getStatus());

        Product savedProduct = productRepository.save(existingProduct);
        return builProductWithDiscountsDTO(savedProduct,productDiscountsRepository);
    }


    public void deleteProduct(int id){
        productRepository.deleteById(id);
    }

}
