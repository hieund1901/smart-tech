package com.sapo.mock.techshop.dto.response;

import lombok.*;

import java.util.Map;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductForDetailDTO {
    private Integer id;
    private Integer collectionId;
    private String name; // for ex: "iPhone 14 128GB | Chính hãng VN/A"
    private String shortName; // for ex: "128Gb, red"
    private Long sellingPrice;
    private Double discount;
    private Integer remainingAmount;
    private Integer soldAmount;
    private String detail;
    private Double rating;
    private Map<String, Object> attributes;
    private String imgBase64;
}
