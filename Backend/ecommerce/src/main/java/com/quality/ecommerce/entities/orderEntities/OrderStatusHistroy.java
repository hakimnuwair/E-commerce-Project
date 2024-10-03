package com.quality.ecommerce.entities.orderEntities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_status_history")
public class OrderStatusHistroy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    Order order;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    OrderDeliveryStatuses orderDeliveryStatuses;

    @Column(name = "updated_at")
    Timestamp updatedAt;

    @Column(name = "updated_by")
    String updatedBy;
}
