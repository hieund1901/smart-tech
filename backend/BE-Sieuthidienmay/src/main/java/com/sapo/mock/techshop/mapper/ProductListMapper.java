package com.sapo.mock.techshop.mapper;

import com.sapo.mock.techshop.dto.response.ProductDashboardResponseDTO;
import com.sapo.mock.techshop.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductListMapper {
    ProductDashboardResponseDTO toDTO(Product entity);
}
