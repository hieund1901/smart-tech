package com.sapo.mock.techshop.dto.response;

import lombok.*;

import java.sql.Timestamp;
import java.util.Map;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductDashboardResponseDTO {
    private Integer id;
//    private Integer collectionId;
    private String name;
    private Long importingPrice;
    private Long sellingPrice;
    private Double discount;
    private Integer remainingAmount;
    private Integer soldAmount;
    private String detail;
    private Double rating;
    private Map<String, Object> attributes;
    private String imageBase64;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
