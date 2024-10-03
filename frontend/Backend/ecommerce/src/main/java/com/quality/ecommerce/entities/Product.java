package com.quality.ecommerce.entities;

import com.quality.ecommerce.entities.orderEntities.OrderItems;
import com.quality.ecommerce.entities.Category;
import com.quality.ecommerce.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;


import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "product_name")
    private String productName;

    @Column(name="url_slug")
    private String urlSlug;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Column(name="description")
    private String description;

    @Column(name = "featured")
    private boolean featured;

    @Column(name = "price")
    private float price;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Column(name = "image_url") // New field for storing image URL
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "status",nullable = false)
    private ProductStatus status = ProductStatus.active;

    @OneToMany(mappedBy = "product")
    private List<Cart> carts;

    @OneToMany(mappedBy = "product")
    private List<OrderItems> orderItems;

    @OneToOne(mappedBy = "product")
    private ProductDiscounts productDiscounts;

    @OneToMany(mappedBy = "product")
    private List<ProductVariant> productVariant;

    public Product(String productName, String urlSlug, Category category, String description,boolean featured, float price, int stockQuantity, String imageUrl, ProductStatus status) {
        this.productName = productName;
        this.urlSlug = urlSlug;
        this.category = category;
        this.description = description;
        this.featured = featured;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.status = status;
    }

}
