package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.ProductVariantDTO;
import com.quality.ecommerce.DTO.ProductVariantResponseDTO;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.ProductVariant;
import com.quality.ecommerce.repository.ProductVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductVariantService {
    @Autowired
    private ProductVariantRepository productVariantRepository;
    @Autowired
    private ProductService productService;

    public void addProductVariant(ProductVariantDTO productVariantDTO){
        int productId = productVariantDTO.getProductId();
        Product product = productService.findProductById(productId);
        ProductVariant productVariant = new ProductVariant();
        productVariant.setProduct(product);
        productVariant.setColor(productVariantDTO.getColor());
        productVariant.setSize(productVariantDTO.getSize());
        productVariant.setStockQuantity(productVariantDTO.getStockQuantity());
        productVariant.setPrice(productVariantDTO.getPrice());
        productVariant.setImageUrl(productVariantDTO.getImageUrl());
        productVariantRepository.save(productVariant);
    }


    public List<ProductVariantResponseDTO> findAllVariants(int productId){
        List<ProductVariant> productVariants = productVariantRepository.findAllByProductId(productId);
        List<ProductVariantResponseDTO> productVariantDTOS = new ArrayList<>();

        for(ProductVariant productVariant : productVariants){
            ProductVariantResponseDTO productVariantDTO = new ProductVariantResponseDTO(productVariant.getId(),productId, productVariant.getColor(),
            productVariant.getSize(), productVariant.getPrice(), productVariant.getStockQuantity(), productVariant.getImageUrl());

            productVariantDTOS.add(productVariantDTO);
        }

        return productVariantDTOS;
    }
}
