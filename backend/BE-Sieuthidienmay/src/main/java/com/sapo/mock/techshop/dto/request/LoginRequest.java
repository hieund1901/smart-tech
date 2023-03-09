package com.sapo.mock.techshop.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class LoginRequest {
    @NotBlank(message = "Tên đăng nhập không được để trống!")
    private String username;
    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;
    /*
     * role:
     *  ROLE_MANAGER
     *  ROLE_ADMIN
     *  ROLE_USER
     */
    @NotBlank(message = "Role is required!")
    private String role;
}
