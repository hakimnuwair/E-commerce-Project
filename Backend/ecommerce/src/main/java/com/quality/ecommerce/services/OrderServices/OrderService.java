package com.quality.ecommerce.services.OrderServices;

import com.quality.ecommerce.DTO.CartItemsWithDiscountDTO;
import com.quality.ecommerce.DTO.OrderDetailsDTO;
import com.quality.ecommerce.DTO.OrderRequest;
import com.quality.ecommerce.DTO.ShippingAddressDTO;
import com.quality.ecommerce.entities.Discount;
import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.authenticationEntities.User;
import com.quality.ecommerce.entities.orderEntities.*;
import com.quality.ecommerce.enums.*;
import com.quality.ecommerce.repository.OrderRepository;
import com.quality.ecommerce.services.ProductService;
import com.quality.ecommerce.services.UserService;
import com.quality.ecommerce.utils.OrderDetailsMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderItemsService orderItemsService;
    @Autowired
    private ShippingAddressService shippingAddressService;
    @Autowired
    private OrderShippingAddressesService orderShippingAddressesService;
    @Autowired
    private OrderStatusHistoryService orderStatusHistoryService;
    @Autowired
    private OrderDeliveryStatusesService orderDeliveryStatusesService;
    @Autowired
    private ProductService productService;


    public List<OrderDetailsDTO> findOrderDetails(){
        List<Order> orders = orderRepository.findAll();
        List<OrderDetailsDTO> orderDetailsDTOList = new ArrayList<>();
        for(Order order: orders){
            orderDetailsDTOList.add(OrderDetailsMapper.toDTO(order));
        }
        return orderDetailsDTOList;
    }

    public List<OrderDetailsDTO> findOrderDetailsByUserId(int userId){
        List<Order> orders = orderRepository.findByUserId(userId);
        List<OrderDetailsDTO> orderDetailsDTOList = new ArrayList<>();
        for(Order order: orders){
            orderDetailsDTOList.add(OrderDetailsMapper.toDTO(order));
        }
        return orderDetailsDTOList;
    }

    @Transactional
    public void processOrder(OrderRequest orderRequest,int userId){
        Order order = addOrder(userId, orderRequest,orderRequest.getPaymentMethod());
    }

    public Order addOrder(int userId, OrderRequest orderRequest,PaymentType paymentType){
        List<CartItemsWithDiscountDTO> cartItems = orderRequest.getProduct();
        User user = userService.findByUserID(userId);
        Order order = new Order();

        float totalAmount = 0;
        float discountedAmount = 0;
        float grossAmount;
        float shippingAmount = 100;
        float netAmount;
        String transactionId = null;

        for(CartItemsWithDiscountDTO cartItem : cartItems){
            totalAmount = totalAmount + (cartItem.getProduct().getPrice() * cartItem.getQuantity());
            discountedAmount = discountedAmount + (cartItem.getProduct().getDiscountedAmount() * cartItem.getQuantity());
        }
        grossAmount = totalAmount - discountedAmount;
        netAmount = grossAmount + shippingAmount;

        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setGrossAmount(grossAmount);
        order.setDiscountedAmount(discountedAmount);
        order.setNetAmount(netAmount);
        order.setStatus(Status.placed);
        order.setPaymentStatus(PaymentStatus.not_paid);
        order.setPaymentType(paymentType);
        order.setPaymentTransactionId(null);
        order.setShippingAmount(shippingAmount);
        order.onCreate();

        addOrderItems(cartItems, order);
        addOrderShippingAddress(orderRequest, order);
        addOrderStatusHistory(order);

        return orderRepository.save(order);
    }

    private void addOrderItems(List<CartItemsWithDiscountDTO> cartItems,Order order){
        List<OrderItems> orderItems = new ArrayList<>();
        for(CartItemsWithDiscountDTO cartItem : cartItems){
            OrderItems orderItem = new OrderItems();
            orderItem.setOrder(order);
            Product product = productService.findProductById(cartItem.getProduct().getProductId());

            if(product.getStockQuantity() < cartItem.getQuantity()){
                throw new RuntimeException("Not enough quantity");
            }

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
                    float totalAmount = discountedPrice * cartItem.getQuantity();
                    orderItem.setTotalAmount(totalAmount);
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

            orderItems.add(orderItem);

            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            if(product.getStockQuantity() == 0){
                product.setStatus(ProductStatus.inactive);
            }
            productService.saveProduct(product);
        }
        order.setOrderItems(orderItems);
    }

    private void addOrderShippingAddress(OrderRequest orderRequest, Order order){
        ShippingAddress shippingAddress = shippingAddressService.saveShippingAddress(orderRequest.getShippingAddressDTO());
        OrderShippingAddress orderShippingAddress = new OrderShippingAddress();
        orderShippingAddress.setOrder(order);
        orderShippingAddress.setAddress(shippingAddress);
        order.setOrderShippingAddress(orderShippingAddress);
    }

    private void addOrderStatusHistory(Order order){
        OrderDeliveryStatuses orderDeliveryStatuses = orderDeliveryStatusesService.find(2);
        OrderStatusHistroy orderStatusHistroy = new OrderStatusHistroy();
        List<OrderStatusHistroy> orderStatusHistroyList = new ArrayList<>();
        orderStatusHistroy.setOrder(order);
        orderStatusHistroy.setOrderDeliveryStatuses(orderDeliveryStatuses);
        orderStatusHistroy.setUpdatedBy("System");
        orderStatusHistroy.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        orderStatusHistroyList.add(orderStatusHistroy);

        order.setOrderStatusHistroyList(orderStatusHistroyList);
    }
}
