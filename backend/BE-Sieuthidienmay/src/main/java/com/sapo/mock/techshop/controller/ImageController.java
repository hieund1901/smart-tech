package com.sapo.mock.techshop.controller;

import com.sapo.mock.techshop.dto.request.ImageRequestDTO;
import com.sapo.mock.techshop.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public String uploadImage(@RequestBody ImageRequestDTO imageRequestDTO) {
        return imageService.uploadImage(imageRequestDTO.getBase64Source());
    }

    @GetMapping("/{name}")
    public String getImage(@PathVariable("name") String name){
        return imageService.loadImageAsBase64Source(name);
    }
}
