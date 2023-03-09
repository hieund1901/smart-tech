package com.sapo.mock.techshop.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductRequestDTO {
    @NotNull(message = "collection_id must not be empty!")
    private Integer collectionId;
    @NotBlank(message = "Tên đầy đủ của sản phẩm không được để trống!")
    private String name; // for ex: "iPhone 14 128GB | Chính hãng VN/A"
    @NotBlank(message = "Tên ngắn gọn của sản phẩm không được để trống!")
    private String shortName; // for ex: "128Gb, red"
    @NotNull(message = "Giá nhập không được để trống!")
    private Long importingPrice; // can not change
    @NotNull(message = "Giá bán không được để trống!")
    private Long sellingPrice;
    private Double discount;
    @NotNull(message = "Số lượng sản phẩm không được để trống!")
    private Integer remainingAmount;
    private Integer soldAmount;
    private String detail;
    private Double rating;
    private Map<String, Object> attributes;
    private String imgBase64;
}
