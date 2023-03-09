package com.sapo.mock.techshop.service;

import org.springframework.core.io.Resource;

public interface ImageService {
    String uploadImage(String base64Source);
    Resource loadImageAsResource(String fileName);
    String loadImageAsBase64Source(String fileName);
}
