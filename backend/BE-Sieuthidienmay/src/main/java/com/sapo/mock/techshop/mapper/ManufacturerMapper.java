package com.sapo.mock.techshop.mapper;

import com.sapo.mock.techshop.dto.response.ManufacturerDTO;
import com.sapo.mock.techshop.entity.Manufacturer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ManufacturerMapper extends GenericMapper<ManufacturerDTO, Manufacturer>{
    @Mapping(target = "id", ignore = true)
    Manufacturer createEntity(ManufacturerDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "created_at", ignore = true)
    @Mapping(target = "updated_at", ignore = true)
    void updateEntity(@MappingTarget Manufacturer entity, ManufacturerDTO dto);

}
