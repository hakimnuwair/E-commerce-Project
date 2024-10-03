package com.quality.ecommerce.entities.orderEntities;

import com.quality.ecommerce.entities.authenticationEntities.User;
import com.quality.ecommerce.enums.PaymentStatus;
import com.quality.ecommerce.enums.PaymentType;
import com.quality.ecommerce.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "order_number")
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "total_amount")
    private float totalAmount;

    @Column(name = "discount_amount")
    private float discountedAmount;

    @Column(name = "gross_amount")
    private float grossAmount;

    @Column(name = "shipping_amount")
    private float shippingAmount;

    @Column(name = "net_amount")
    private float netAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @Column(name = "payment_transaction_id")
    private String paymentTransactionId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItems> orderItems;

    @OneToOne(mappedBy = "order",cascade = CascadeType.ALL,orphanRemoval = true)
    private OrderShippingAddress orderShippingAddress;

    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderStatusHistroy> orderStatusHistroyList;

    @PrePersist
    public void prePersist() {
        this.orderNumber = "ORDER" + UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    }

    public void onCreate(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    protected void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
}
