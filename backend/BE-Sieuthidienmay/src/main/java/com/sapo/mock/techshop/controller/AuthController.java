package com.sapo.mock.techshop.controller;

import com.sapo.mock.techshop.dto.request.LoginRequest;
import com.sapo.mock.techshop.dto.request.RegisterUserRequestDTO;
import com.sapo.mock.techshop.dto.response.GeneralResponse;
import com.sapo.mock.techshop.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {
    @Autowired
    private AuthUserService authUserService;

    @PostMapping("/login")
    public GeneralResponse<?> login(@RequestBody LoginRequest loginRequest) {
        return GeneralResponse.ok(authUserService.handleLoginRequest(loginRequest));
    }

    @PostMapping("/register")
    public GeneralResponse<?> register(@RequestBody RegisterUserRequestDTO registerUserRequestDTO) {
        authUserService.createUser(registerUserRequestDTO);
        return GeneralResponse.ok(null);
    }
}
