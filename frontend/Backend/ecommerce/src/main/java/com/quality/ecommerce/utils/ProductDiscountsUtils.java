package com.quality.ecommerce.utils;

import com.quality.ecommerce.DTO.ProductWithDiscountsDTO;
import com.quality.ecommerce.entities.Discount;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.ProductDiscounts;
import com.quality.ecommerce.enums.DiscountType;
import com.quality.ecommerce.repository.ProductDiscountsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class ProductDiscountsUtils {



    private static float calculateDiscountedPrice(float price, Discount discount) {
        float discountedPrice = price;
        float discountValue = discount.getDiscountValue();

        if (discount.getDiscountType() == DiscountType.Percentage) {
            discountedPrice = discountedPrice * ((100 - discountValue) / 100);
        } else if (discount.getDiscountType() == DiscountType.Fixed) {
            discountedPrice = discountedPrice - discountValue;
        }
        return discountedPrice;
    }


    private static float calculateDiscountAmount(float originalPrice, float discountedPrice) {
        return originalPrice - discountedPrice;
    }

    private static float calculateDiscountPercentage(float originalPrice, float discountedPrice) {
        float discountAmount = originalPrice - discountedPrice;
        return  (discountAmount / originalPrice) * 100;
    }

    public static ProductWithDiscountsDTO builProductWithDiscountsDTO(Product product, ProductDiscountsRepository productDiscountsRepository){
        ProductWithDiscountsDTO productWithDiscountsDTO = new ProductWithDiscountsDTO();
        ProductDiscounts productDiscount = productDiscountsRepository.findByProductId(product.getId());
        if(productDiscount != null){
            Discount discount = productDiscount.getDiscount();
            float discountedPrice = calculateDiscountedPrice(product.getPrice(), discount);
            productWithDiscountsDTO.setDiscountType(discount.getDiscountType());
            float discountedAmount = calculateDiscountAmount(product.getPrice(),discountedPrice);
            if(discount.getDiscountType() == DiscountType.Percentage){
                productWithDiscountsDTO.setDiscountPercentage(discount.getDiscountValue());
            }else{
                productWithDiscountsDTO.setDiscountValue(discount.getDiscountValue());
            }
            productWithDiscountsDTO.setDiscountedAmount(discountedAmount);
            productWithDiscountsDTO.setDiscountedPrice(discountedPrice);
        }else{
            productWithDiscountsDTO.setDiscountType(null);
            productWithDiscountsDTO.setDiscountValue(0);
            productWithDiscountsDTO.setDiscountPercentage(0);
            productWithDiscountsDTO.setDiscountedAmount(0);
            productWithDiscountsDTO.setDiscountedPrice(product.getPrice());
        }
        productWithDiscountsDTO.setProduct(product);

        return productWithDiscountsDTO;
    }

    public static List<ProductWithDiscountsDTO> buildProductWithDiscountsDTOList(List<Product> products, ProductDiscountsRepository productDiscountsRepository){
        List<ProductWithDiscountsDTO> productsDTOList = new ArrayList<>();
        for(Product product : products){
            ProductWithDiscountsDTO fullProduct = new ProductWithDiscountsDTO();
            ProductDiscounts productDiscount = productDiscountsRepository.findByProductId(product.getId());
            if(productDiscount != null){
                Discount discount = productDiscount.getDiscount();

                float discountedPrice = calculateDiscountedPrice(product.getPrice(),discount);
                float discountedAmount =calculateDiscountAmount(product.getPrice(), discountedPrice);

                fullProduct.setDiscountType(discount.getDiscountType());
                if(discount.getDiscountType() == DiscountType.Percentage){
                    fullProduct.setDiscountPercentage(discount.getDiscountValue());
                }else{
                    fullProduct.setDiscountValue(discount.getDiscountValue());
                }

                fullProduct.setDiscountedAmount(discountedAmount);
                fullProduct.setDiscountedPrice(discountedPrice);
            }else{
                fullProduct.setDiscountType(null);
                fullProduct.setDiscountValue(0);
                fullProduct.setDiscountPercentage(0);
                fullProduct.setDiscountedAmount(0);
                fullProduct.setDiscountedPrice(product.getPrice());
            }
            fullProduct.setProduct(product);
            productsDTOList.add(fullProduct);
        }
        return productsDTOList;
    }
}
