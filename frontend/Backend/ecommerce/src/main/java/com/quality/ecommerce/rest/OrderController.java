package com.quality.ecommerce.rest;

import com.quality.ecommerce.DTO.*;
import com.quality.ecommerce.entities.authenticationEntities.User;
import com.quality.ecommerce.entities.orderEntities.Order;
import com.quality.ecommerce.entities.orderEntities.OrderDeliveryStatuses;
import com.quality.ecommerce.entities.orderEntities.ShippingAddress;
import com.quality.ecommerce.jwt.JwtHelper;
import com.quality.ecommerce.services.OrderServices.*;
import com.quality.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class OrderController {
    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private UserService userService;
    @Autowired
    private ShippingAddressService shippingAddressService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderItemsService orderItemsService;
    @Autowired
    private OrderShippingAddressesService orderShippingAddressesService;
    @Autowired
    private OrderStatusHistoryService orderStatusHistoryService;
    @Autowired
    private OrderDeliveryStatusesService orderDeliveryStatusesService;

//    @PostMapping("/address")
//    public ResponseEntity<?> addAddress(@RequestHeader("Authorization") String token, @RequestBody ShippingAddressDTO shippingAddressDTO){
//        int userId = fetchUserId(token);
//        shippingAddressService.saveShippingAddress(shippingAddressDTO);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

//    @GetMapping("/address")
//    public ResponseEntity<ShippingAddressDTO> fetchAddress(@RequestHeader("Authorization") String token){
//        int userId = fetchUserId(token);
//        ShippingAddressDTO shippingAddressDTO = shippingAddressService.findAddress(userId);
//        if(shippingAddressDTO == null){
//            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<ShippingAddressDTO>(shippingAddressDTO,HttpStatus.OK);
//    }

//    @PutMapping("/address")
//    public ResponseEntity<ShippingAddress> updateAddress(@RequestHeader("Authorization") String token,@RequestBody ShippingAddress shippingAddress){
//        int userId = fetchUserId(token);
//        userService.findByUserID(userId);
//
//
//        Optional<ShippingAddress> existingAddressOpt = shippingAddressService.findByIdAndUserId(shippingAddress.getId(), userId);
//
//        if (existingAddressOpt.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//
//
//        ShippingAddress existingAddress = existingAddressOpt.get();
//
//        // Update all fields
//        existingAddress.setFullAddress(shippingAddress.getFullAddress());
//        existingAddress.setState(shippingAddress.getState());
//        existingAddress.setCity(shippingAddress.getCity());
//        existingAddress.setPincode(shippingAddress.getPincode());
//        existingAddress.setMobileNo(shippingAddress.getMobileNo());
//
//        shippingAddressService.addAddress(existingAddress);
//
//        return ResponseEntity.ok(existingAddress);
//    }

    @GetMapping("/order")
    public ResponseEntity<List<OrderDetailsDTO>> getOrderDetails(@RequestHeader("Authorization") String token){
        List<OrderDetailsDTO> orderDetailsDTOList = orderService.findOrderDetails();
        return ResponseEntity.ok(orderDetailsDTOList);
    }

    @GetMapping("/order-user")
    public ResponseEntity<List<OrderDetailsDTO>> getOrderDetailsByUserId(@RequestHeader("Authorization") String token){
        int userId = fetchUserId(token);
        List<OrderDetailsDTO> orderDetailsDTOList= orderService.findOrderDetailsByUserId(userId);
        return ResponseEntity.ok(orderDetailsDTOList);
    }

    @PostMapping("/order")
    public ResponseEntity<String> addOrder(@RequestHeader("Authorization") String token,@RequestBody OrderRequest orderRequest){
        int userId = fetchUserId(token);
        orderService.processOrder(orderRequest, userId);
        return new ResponseEntity<String>("Order Placed Successfully!",HttpStatus.OK);
    }

    public int fetchUserId(String token){
        String jwtToken = token.substring(7);
        return jwtHelper.getUserIdFromToken(jwtToken);
    }
}
