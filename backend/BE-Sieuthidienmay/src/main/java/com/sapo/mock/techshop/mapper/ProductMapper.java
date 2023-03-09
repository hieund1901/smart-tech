package com.sapo.mock.techshop.mapper;

import com.sapo.mock.techshop.dto.request.ProductRequestDTO;
import com.sapo.mock.techshop.dto.response.ProductForDetailDTO;
import com.sapo.mock.techshop.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    Product createEntity(ProductRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(@MappingTarget Product entity, ProductRequestDTO dto);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "collectionId", source = "collection.id")
    ProductForDetailDTO toProductForDetailDTO(Product product);
}
