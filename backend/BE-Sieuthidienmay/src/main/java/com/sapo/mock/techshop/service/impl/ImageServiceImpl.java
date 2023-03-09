package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.common.constant.HttpStatusConstant;
import com.sapo.mock.techshop.common.exception.BusinessException;
import com.sapo.mock.techshop.common.utils.Base64ToMultipartFile;
import com.sapo.mock.techshop.config.MediaStorageProperties;
import com.sapo.mock.techshop.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Component
@Slf4j
public class ImageServiceImpl implements ImageService {
    private final Path fileStorageLocation;

    public ImageServiceImpl(MediaStorageProperties mediaStorageProperties) {
        this.fileStorageLocation = Paths.get(mediaStorageProperties.getUploadDirectory()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            log.error("Create directory error {}", ex.getMessage());
            throw new BusinessException(HttpStatusConstant.IMAGE_ERROR_CODE, HttpStatusConstant.IMAGE_ERROR_MESSAGE_CREATE_DIRECTORY);
        }
    }

    @Override
    public String uploadImage(String base64Source) {
        MultipartFile file = Base64ToMultipartFile.convertBase64SourceToMultipart(base64Source);
        String fileName = null;
        if (file != null) {
            try {
                fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
                Path targetLocation = this.fileStorageLocation.resolve(fileName);
                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                return fileName;
            } catch (Exception ex) {
                log.error("Upload image error {}", ex.getMessage());
            }
        } else {
            return "";
        }
        return fileName;
    }

    @Override
    public Resource loadImageAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new BusinessException(HttpStatusConstant.IMAGE_ERROR_CODE, HttpStatusConstant.IMAGE_ERROR_MESSAGE_NOT_EXIST);
            }
        } catch (Exception ex) {
            log.error("Load image error {}", ex.getMessage());
            throw new BusinessException(HttpStatusConstant.IMAGE_ERROR_CODE, HttpStatusConstant.IMAGE_ERROR_MESSAGE_GET_IMAGE);
        }
    }

    @Override
    public String loadImageAsBase64Source(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return Base64ToMultipartFile.convertFileToBase64Source(resource.getFile());
            } else {
                throw new BusinessException(HttpStatusConstant.IMAGE_ERROR_CODE, HttpStatusConstant.IMAGE_ERROR_MESSAGE_NOT_EXIST);
            }
        } catch (Exception ex) {
            log.error("Load image error {}", ex.getMessage());
            throw new BusinessException(HttpStatusConstant.IMAGE_ERROR_CODE, HttpStatusConstant.IMAGE_ERROR_MESSAGE_GET_IMAGE);
        }
    }
}
