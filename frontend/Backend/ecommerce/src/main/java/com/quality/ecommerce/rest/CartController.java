package com.quality.ecommerce.rest;

import com.quality.ecommerce.DTO.CartItemsDTO;
import com.quality.ecommerce.DTO.CartItemsWithDiscountDTO;
import com.quality.ecommerce.entities.Cart;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.authenticationEntities.User;
import com.quality.ecommerce.jwt.JwtHelper;
import com.quality.ecommerce.repository.CartRepository;
import com.quality.ecommerce.services.CartService;
import com.quality.ecommerce.services.ProductService;
import com.quality.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CartController {
    @Autowired
    UserService userService;
    @Autowired
    ProductService productService;
    @Autowired
    CartService cartService;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    JwtHelper jwtHelper;



    @PostMapping("/cart/add")
    public ResponseEntity<String> addProduct(@RequestHeader("Authorization") String token,@RequestBody Map<String, Integer> request){
        int userId = fetchUserId(token);
        User user = userService.findByUserID(userId);
        Product product = productService.findProductById(request.get("productId"));

        // Check if the product is already in the user's cart
        List<CartItemsDTO> existingCartItems = cartService.findCartsByUserId(userId);
        for (CartItemsDTO existingCartItem : existingCartItems) {
            if (existingCartItem.getProduct().getProductId() == request.get("productId")) {
                return new ResponseEntity<>("Product already exists in cart", HttpStatus.CONFLICT);
            }
        }

        Cart cart = new Cart(user, product, 1);
        cartService.addCart(cart);
         return new ResponseEntity<>("product added successfuly", HttpStatus.OK);
    }



    @GetMapping("/cart")
    public  ResponseEntity<List<CartItemsWithDiscountDTO>>getCartProducts(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        int userId = jwtHelper.getUserIdFromToken(jwtToken);
        List<CartItemsWithDiscountDTO> cartItems = cartService.findCartsWithDiscountByUserId(userId);
        return new ResponseEntity<>(cartItems,HttpStatus.OK);
//        List<CartItemsDTO> cartItems = cartService.findCartsByUserId(userId);
//        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @PostMapping("/cart/decrease")
    public ResponseEntity<?> decreaseQuantity(@RequestHeader("Authorization") String token, @RequestBody Map<String, Integer> request) {
        int userId = fetchUserId(token);

        Integer productId = request.get("productId");
        if (productId == null) {
            return new ResponseEntity<>("Product ID is missing", HttpStatus.BAD_REQUEST);
        }

        cartService.decreaseQuantity(userId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/cart/increase")
    public ResponseEntity<?> increaseQuantity(@RequestHeader("Authorization") String token, @RequestBody Map<String, Integer> request){
        int userId = fetchUserId(token);
        cartService.increaseQuantity(userId, request.get("productId"));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/cart/{productId}")
    public ResponseEntity<?> deleteProductItem(@RequestHeader("Authorization") String token,@PathVariable int productId){
        int userId = fetchUserId(token);
        cartService.deleteCartProduct(userId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public int fetchUserId(String token){
        String jwtToken = token.substring(7);
        return jwtHelper.getUserIdFromToken(jwtToken);
    }
}

