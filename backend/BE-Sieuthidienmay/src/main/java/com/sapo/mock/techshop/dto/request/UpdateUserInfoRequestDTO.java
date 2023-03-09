package com.sapo.mock.techshop.dto.request;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UpdateUserInfoRequestDTO {
    private String username;
    private String password;
    private String role;
}
