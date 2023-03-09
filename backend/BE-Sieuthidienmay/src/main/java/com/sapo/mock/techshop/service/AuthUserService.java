package com.sapo.mock.techshop.service;

import com.sapo.mock.techshop.dto.request.LoginRequest;
import com.sapo.mock.techshop.dto.request.RegisterUserRequestDTO;
import com.sapo.mock.techshop.dto.response.LoginUserInfo;
import com.sapo.mock.techshop.dto.response.UserListDTO;
import com.sapo.mock.techshop.entity.AuthUser;

import java.util.List;

public interface AuthUserService {
    LoginUserInfo handleLoginRequest(LoginRequest loginRequest);
    AuthUser findByUsername(String username);
    void createUser(RegisterUserRequestDTO registerUserRequestDTO);
    void deleteUser(Integer userId);
    UserListDTO getUserById(Integer userId);
    List<UserListDTO> listUsersForDashboard();
}
