package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.CartItemsDTO;
import com.quality.ecommerce.DTO.CartItemsWithDiscountDTO;
import com.quality.ecommerce.DTO.ProductDTO;
import com.quality.ecommerce.entities.Cart;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.ProductDiscounts;
import com.quality.ecommerce.repository.CartRepository;
import com.quality.ecommerce.repository.ProductDiscountsRepository;
import com.quality.ecommerce.utils.ProductMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.quality.ecommerce.utils.ProductDiscountsUtils.builProductWithDiscountsDTO;
import static com.quality.ecommerce.utils.ProductDiscountsUtils.buildProductWithDiscountsDTOList;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductDiscountsRepository productDiscountsRepository;




    public void addCart(Cart cart){
        cartRepository.save(cart);
    }

    public List<CartItemsDTO> findCartsByUserId(int userId) {
        List<Cart> cartItems = cartRepository.findByUser_id(userId);

        List<CartItemsDTO> cartItemsDTOList = new ArrayList<>();

        for(Cart cart : cartItems){
            CartItemsDTO cartItemDTO = new CartItemsDTO();
            cartItemDTO.setProduct(ProductMapper.toDTO(cart.getProduct()));
            cartItemDTO.setQuantity(cart.getQuantity());
            cartItemsDTOList.add(cartItemDTO);
        }

        return cartItemsDTOList;
    }

    public List<CartItemsWithDiscountDTO> findCartsWithDiscountByUserId(int userId){
        List<Cart> cartItems = cartRepository.findByUser_id(userId);
        List<CartItemsWithDiscountDTO> cartItemsWithDiscountDTOS = new ArrayList<>();

        for(Cart cart: cartItems){
            CartItemsWithDiscountDTO cartItemsWithDiscountDTO = new CartItemsWithDiscountDTO();
            Product product = new Product();
            product = fetchProduct(product, cart);
            ProductDiscounts productDiscount = productDiscountsRepository.findByProductId(product.getId());
            cartItemsWithDiscountDTO.setProduct(builProductWithDiscountsDTO(product,productDiscountsRepository));
            cartItemsWithDiscountDTO.setQuantity(cart.getQuantity());
            cartItemsWithDiscountDTOS.add(cartItemsWithDiscountDTO);
        }

        return cartItemsWithDiscountDTOS;

    }

    public void decreaseQuantity(int userId, int productId) {
        Cart cart = cartRepository.findByUserIdAndProductId(userId, productId);
        if (cart == null) {
            // Handle case when cart is not found
            throw new EntityNotFoundException("Cart entry not found for userId: " + userId + " and productId: " + productId);
        }

        int qty = cart.getQuantity();
        if (qty > 1) {
            cart.setQuantity(qty - 1);
            cartRepository.save(cart);
        } else if (qty == 1) {
            // Optionally remove the cart entry if the quantity is reduced to zero
            cartRepository.delete(cart);
        }
    }


    public void increaseQuantity(int userId, int productId){
        Cart cart = cartRepository.findByUserIdAndProductId(userId, productId);
        if(cart != null){
            cart.setQuantity(cart.getQuantity() + 1);
            cartRepository.save(cart);
        }
    }

    @Transactional
    public void deleteCartProduct(int userId, int productId){
        Cart cart = cartRepository.findByUserIdAndProductId(userId, productId);
        if(cart != null){
            cartRepository.deleteByUserIdAndProductId(userId, productId);
        }
    }

    private Product fetchProduct(Product product, Cart cartItem){
        product.setId(cartItem.getProduct().getId());
        product.setProductName(cartItem.getProduct().getProductName());
        product.setDescription(cartItem.getProduct().getDescription());
        product.setCategory(cartItem.getProduct().getCategory());
        product.setFeatured(cartItem.getProduct().isFeatured());
        product.setPrice(cartItem.getProduct().getPrice());
        product.setImageUrl(cartItem.getProduct().getImageUrl());
        product.setStockQuantity(cartItem.getProduct().getStockQuantity());
        product.setUrlSlug(cartItem.getProduct().getUrlSlug());

        return product;
    }
}
