package com.sapo.mock.techshop.dto.response;

import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategorySingleDTO {
    private Integer id;
    private String name;
    private List<ProductUserResponseDTO> productUserResponseDTOs;
    private String featureImgBase64;

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    private static class ProductUserResponseDTO {
        private Integer id;
        private String name;
        private Long sellingPrice;
        private Double discount;
        private Integer remainingAmount;
        private String detail;
        private Double rating;
        private String imgBase64;
    }
}
