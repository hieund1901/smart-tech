package com.sapo.mock.techshop.dto.response;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CollectionDTO {
    private Integer id;
    @NotNull(message = "manufacture_id must not be empty!")
    private Integer manufacturer_id;
    @NotNull(message = "category_id name must not be empty!")
    private Integer category_id;
    @NotBlank(message = "Bạn chưa nhập tên!")
    private String name;
    private Integer status;
    private Date created_at;
    private Date updated_at;
}