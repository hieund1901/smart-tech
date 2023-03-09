package com.sapo.mock.techshop.repository;

import com.sapo.mock.techshop.dto.response.UserListDTO;

import java.util.List;

public interface UserRepoCustom {
    List<UserListDTO> getDetailsAllusers();
}
