package com.sapo.mock.techshop.dto.response;

import com.sapo.mock.techshop.entity.Product;
import lombok.*;
import java.util.Date;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CollectionResponseDTO {
    private Integer id;
    private Integer manufacturer_id;
    private Integer category_id;
    private String name;
    private List<Product> products;
    private Date created_at;
}
