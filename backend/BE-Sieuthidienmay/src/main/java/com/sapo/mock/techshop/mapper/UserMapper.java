package com.sapo.mock.techshop.mapper;

import com.sapo.mock.techshop.dto.request.RegisterUserRequestDTO;
import com.sapo.mock.techshop.dto.response.UserListDTO;
import com.sapo.mock.techshop.entity.AuthUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserListDTO toUserListDTO(AuthUser entity);
    AuthUser toEntity(RegisterUserRequestDTO dto);
}
