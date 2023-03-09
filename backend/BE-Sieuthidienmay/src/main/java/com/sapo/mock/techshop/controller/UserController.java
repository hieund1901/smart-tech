package com.sapo.mock.techshop.controller;

import com.sapo.mock.techshop.dto.response.GeneralResponse;
import com.sapo.mock.techshop.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/dashboard/users")
public class UserController {
    @Autowired
    private AuthUserService authUserService;

    @GetMapping("/{userId}")
    public GeneralResponse<?> getUserInfo(@PathVariable Integer userId) {
        return GeneralResponse.ok(authUserService.getUserById(userId));
    }

    @DeleteMapping("/{userId}")
    public GeneralResponse<?> deleteUserById(@PathVariable Integer userId) {
        authUserService.deleteUser(userId);
        return GeneralResponse.ok(null);
    }

    @GetMapping
    public GeneralResponse<?> listUsers() {
        return GeneralResponse.ok(authUserService.listUsersForDashboard());
    }
}
