package com.quality.ecommerce.services.OrderServices;

import com.quality.ecommerce.DTO.CartItemsWithDiscountDTO;
import com.quality.ecommerce.entities.Discount;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.orderEntities.Order;
import com.quality.ecommerce.entities.orderEntities.OrderItems;
import com.quality.ecommerce.enums.DiscountType;
import com.quality.ecommerce.enums.ProductStatus;
import com.quality.ecommerce.repository.OrderItemsRepo;
import com.quality.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemsService {
    @Autowired
    private OrderItemsRepo orderItemsRepo;
    @Autowired
    private ProductService productService;

    public void addOrderItems(Order order, List<CartItemsWithDiscountDTO> cartItems){
        for(CartItemsWithDiscountDTO cartItem : cartItems){
            OrderItems orderItem = new OrderItems();
            orderItem.setOrder(order);
            Product product = productService.findProductById(cartItem.getProduct().getProductId());
            orderItem.setProduct(product);
            if(product.getProductDiscounts() != null){
                Discount discount = product.getProductDiscounts().getDiscount();
                orderItem.setDiscountType(discount.getDiscountType());
                orderItem.setDiscountValue(discount.getDiscountValue());
                float discountedPrice;
                if(discount.getDiscountType() == DiscountType.Percentage){
                    float discountedValue = product.getPrice() * (discount.getDiscountValue() / 100);
                    discountedPrice = product.getPrice() - discountedValue;
                    float totalAmount = discountedPrice * cartItem.getQuantity();
                    orderItem.setTotalAmount(totalAmount);
                }else{
                    discountedPrice = product.getPrice() - discount.getDiscountValue();
                }
                orderItem.setDiscountedPrice(discountedPrice);
            }else{
                float totalAmount = product.getPrice() * cartItem.getQuantity();
                orderItem.setTotalAmount(totalAmount);
            }

            orderItem.setProductName(cartItem.getProduct().getProductName());
            float price = cartItem.getProduct().getPrice();
            orderItem.setPrice(price);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItemsRepo.save(orderItem);
            if(product.getStockQuantity() < cartItem.getQuantity()){
                throw new RuntimeException("Not enough quantity");
            }
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            if(product.getStockQuantity() == 0){
                product.setStatus(ProductStatus.inactive);
            }
            productService.saveProduct(product);
        }
    }
}
