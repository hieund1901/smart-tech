package com.sapo.mock.techshop.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "order_product_details")
public class OrderProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer orderId;
    private Integer productId;
    private String productName;
    private String productShortName;
    private Integer quantity;
    private Long sellingPrice; // sellingPrice (after discount) at order time
    private Long importingPrice; // importingPrice at order time
    private String detail;
    private String imgLink;
    @CreationTimestamp
    private LocalDateTime createdAt;
}
