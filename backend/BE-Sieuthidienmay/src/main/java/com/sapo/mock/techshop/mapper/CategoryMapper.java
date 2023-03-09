package com.sapo.mock.techshop.mapper;

import com.sapo.mock.techshop.dto.response.CategoryDTO;
import com.sapo.mock.techshop.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "id", ignore = true)
    Category createEntity(CategoryDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "created_at", ignore = true)
    @Mapping(target = "updated_at", ignore = true)
    void updateEntity(@MappingTarget Category entity, CategoryDTO dto);

}
