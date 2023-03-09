package com.sapo.mock.techshop.mapper;

import com.sapo.mock.techshop.dto.request.OrderRequestDTO;
import com.sapo.mock.techshop.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper extends GenericMapper<OrderRequestDTO, Order> {
    @Mapping(target = "id", ignore = true)
    Order createEntity(OrderRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "code", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(@MappingTarget Order entity, OrderRequestDTO dto);
}
