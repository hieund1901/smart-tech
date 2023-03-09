package com.sapo.mock.techshop.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class OrderRequestDTO {
    private Integer userId;
    @NotBlank(message = "Bạn chưa nhập họ tên!")
    private String name;
    private List<ProductWithAmount> products;

    @NotBlank(message = "Bạn chưa nhập số điện thoại!")
    @Pattern(regexp = "^[0-9]*$", message = "Số điện thoại không đúng định dạng!")
    private String phone;

    @NotBlank(message = "Bạn chưa nhập địa chỉ!")
    private String address;

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @Getter
    public static class ProductWithAmount {
        Integer productId;
        Integer amount;
    }
}
