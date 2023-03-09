package com.sapo.mock.techshop.dto.response;

import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserListDTO {
    private String email;
    private String username;
    private String name;
    private String phone;
    private String address;
    private Long totalProduct;
    private Long totalCost;
    private Long totalOrder;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
