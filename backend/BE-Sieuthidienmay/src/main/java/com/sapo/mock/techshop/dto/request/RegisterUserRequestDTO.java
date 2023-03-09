package com.sapo.mock.techshop.dto.request;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RegisterUserRequestDTO {
    @NotBlank(message = "Tên đăng nhập không được để trống!")
    private String username;

    // Minimum 8 characters, at least one letter and one number
    @NotBlank(message = "Mật khẩu không được để trống!")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Mật khẩu phải có tối thiểu 8 kí tự, ít nhất 1 kí tự số và 1 kí tự chữ!")
    private String password;

    @NotBlank(message = "Bạn chưa nhập họ tên!")
    private String name;

    @NotBlank(message = "Bạn chưa nhập địa chỉ email!")
    @Email(message = "Email chưa đúng định dạng!")
    private String email;

    @NotBlank(message = "Bạn chưa nhập số điện thoại!")
    @Pattern(regexp = "^[0-9]*$", message = "Số điện thoại không đúng định dạng!")
    private String phone;

    @NotBlank(message = "Bạn chưa nhập địa chỉ!")
    private String address;
}
