package com.sapo.mock.techshop.mapper;

import com.sapo.mock.techshop.dto.response.CollectionDTO;
import com.sapo.mock.techshop.dto.response.CollectionResponseDTO;
import com.sapo.mock.techshop.entity.Collection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CollectionMapper{
    @Mapping(target = "id", ignore = true)
    Collection createEntity(CollectionDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "created_at", ignore = true)
    @Mapping(target = "updated_at", ignore = true)
    void updateEntity(@MappingTarget Collection entity, CollectionDTO dto);

    @Mapping(target = "category_id",source = "category.id")
    @Mapping(target = "manufacturer_id",source = "manufacturer.id")
    CollectionResponseDTO toCollectionResponseDto(Collection entity);

    List<CollectionResponseDTO> toListCollectionResponseDto(List<Collection> entity);
}