package com.sapo.mock.techshop.dto.response;

import com.sapo.mock.techshop.entity.Collection;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryDTO implements Serializable {
    private Integer id;
    @NotBlank(message = "Bạn chưa nhập tên!")
    private String name;
    private Integer status;
    private Date created_at;
    private Date updated_at;
}
