package com.sapo.mock.techshop.dto.request;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ImageRequestDTO {
    String base64Source;
}
