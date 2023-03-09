package com.sapo.mock.techshop.dto.response;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductForHomePageDTO {
    private Integer id;
    private Integer collectionId;
    private String name;
    private Long sellingPrice;
    private Double discount;
    private Double rating;
    private String imageBase64;
}
