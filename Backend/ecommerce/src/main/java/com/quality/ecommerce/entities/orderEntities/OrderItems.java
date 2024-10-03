package com.quality.ecommerce.entities.orderEntities;

import com.quality.ecommerce.entities.Product;
import com.quality.ecommerce.entities.ProductVariant;
import com.quality.ecommerce.enums.DiscountType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_items")
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false)
    private Order order;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id",referencedColumnName = "id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_variant_id", referencedColumnName = "id", nullable = true)
    private ProductVariant productVariant;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "color", nullable = true)
    private String color;

    @Column(name = "size")
    private String size;

    @Column(name = "price", nullable = false)
    private float price;

    @Enumerated(EnumType.STRING)
    @Column(name = "discount_type")
    private DiscountType discountType;

    @Column(name = "discount_value")
    private float discountValue;

    @Column(name = "discounted_price")
    private float discountedPrice;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "total_amount", nullable = false)
    private float totalAmount;
}
