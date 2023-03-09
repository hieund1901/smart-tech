package com.sapo.mock.techshop.dto.response;

import com.sapo.mock.techshop.entity.Collection;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ManufacturerDTO implements Serializable {
    private Integer id;
    @NotBlank(message = "Bạn chưa nhập tên!")
    private String name;
    private Integer status;
//    private List<Collection> collections;
    private Timestamp created_at;
    private Timestamp updated_at;
}
