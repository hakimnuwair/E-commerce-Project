package com.quality.ecommerce.entities;

import com.quality.ecommerce.entities.orderEntities.OrderItems;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_variants")
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    Product product;

    @Column(name = "color", nullable = true)
    String color;

    @Column(name = "size", nullable = true)
    String size;

    @Column(name = "stock_quantity", nullable = false)
    int stockQuantity;

    @Column(name = "image_url", nullable = false)
    String imageUrl;

    @Column(name = "price", nullable = false)
    float price;

    @OneToMany(mappedBy = "productVariant")
    private List<OrderItems> orderItems;
}
