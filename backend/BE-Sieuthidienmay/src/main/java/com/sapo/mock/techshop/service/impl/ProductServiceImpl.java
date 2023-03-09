package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.common.exception.BusinessException;
import com.sapo.mock.techshop.common.utils.DTOValidator;
import com.sapo.mock.techshop.dto.request.ProductRequestDTO;
import com.sapo.mock.techshop.dto.response.ProductDashboardResponseDTO;
import com.sapo.mock.techshop.dto.response.ProductForDetailDTO;
import com.sapo.mock.techshop.dto.response.ProductForHomePageDTO;
import com.sapo.mock.techshop.entity.Collection;
import com.sapo.mock.techshop.entity.Product;
import com.sapo.mock.techshop.mapper.ProductListMapper;
import com.sapo.mock.techshop.mapper.ProductMapper;
import com.sapo.mock.techshop.repository.CollectionRepo;
import com.sapo.mock.techshop.repository.ProductRepo;
import com.sapo.mock.techshop.repository.ProductRepoCustom;
import com.sapo.mock.techshop.service.ImageService;
import com.sapo.mock.techshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

import static com.sapo.mock.techshop.common.constant.HttpStatusConstant.*;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepo productRepo;
    @Autowired
    ProductMapper productMapper;
    @Autowired
    ProductListMapper productListMapper;
    @Autowired
    DTOValidator dtoValidator;
    @Autowired
    CollectionRepo collectionRepo;
    @Autowired
    ProductRepoCustom productRepoCustom;
    @Autowired
    private ImageService imageService;

    @Override
    public List<ProductDashboardResponseDTO> getAll() {
        List<Product> products = productRepo.findAll();
        products.sort(Comparator.reverseOrder());
        List<ProductDashboardResponseDTO> dtos = new ArrayList<>();
        for (Product p : products) {
            ProductDashboardResponseDTO dto = productListMapper.toDTO(p);
            dto.setImageBase64(imageService.loadImageAsBase64Source(p.getImgLink()));
            dtos.add(dto);
        }
        return dtos;
    }

    @Override
    public ProductDashboardResponseDTO getById(Integer id) {
        Product product = productRepo.findById(id)
                .orElseThrow(( () -> new BusinessException(NOT_FOUND_CODE, PRODUCT_NOT_FOUND_MESSAGE)));
        ProductDashboardResponseDTO dto = productListMapper.toDTO(product);
        dto.setImageBase64(imageService.loadImageAsBase64Source(product.getImgLink()));
        return dto;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Product updateById(Integer id, ProductRequestDTO productRequestDTO) {
        dtoValidator.validate(productRequestDTO);

        Product product = productRepo.findById(id)
                .orElseThrow((() -> new BusinessException(NOT_FOUND_CODE, PRODUCT_NOT_FOUND_MESSAGE)));

        productMapper.updateEntity(product, productRequestDTO);

        return productRepo.save(product);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Product create(ProductRequestDTO productRequestDTO) {
        dtoValidator.validate(productRequestDTO);

        // check if collection_id exists
        Collection collection = collectionRepo.findById(productRequestDTO.getCollectionId()).
                orElseThrow(() -> new BusinessException(NOT_FOUND_CODE, COLLECTION_NOT_FOUND_MESSAGE));

        Product product = productMapper.createEntity(productRequestDTO);
        product.setCollection(collection);

        String imgLink = imageService.uploadImage(productRequestDTO.getImgBase64());
        product.setImgLink(imgLink);
        return productRepo.save(product);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteById(Integer id) {
        Product product = productRepo.findById(id)
                .orElseThrow((() -> new BusinessException(NOT_FOUND_CODE, PRODUCT_NOT_FOUND_MESSAGE)));
        Collection c = product.getCollection();
        c.getProducts().remove(product);
        collectionRepo.save(c);

        productRepo.deleteById(id);
    }

    @Override
    public List<ProductForHomePageDTO> getTopProductsByCategory(Integer count, Integer categoryId) {
        return productRepoCustom.getTopProductsByCategory(count, categoryId);
    }

    @Override
    public List<ProductForDetailDTO> findProductByCollectionId(Integer collectionId) {
        List<Product> products = productRepo.findProductByCollectionId(collectionId);
        List<ProductForDetailDTO> dtos = new ArrayList<>();
        for (Product p : products) {
            ProductForDetailDTO dto = productMapper.toProductForDetailDTO(p);
            dto.setImgBase64(imageService.loadImageAsBase64Source(p.getImgLink()));
            dtos.add(dto);
        }
        return dtos;
    }

    @Override
    public List<ProductForDetailDTO> getAllByNameContains(String name) {
        List<Product> products = productRepo.findAllByNameContainsIgnoreCase(name);
        products.sort(Comparator.reverseOrder());
        List<ProductForDetailDTO> dtos = new ArrayList<>();
        for (Product p : products) {
            ProductForDetailDTO dto = productMapper.toProductForDetailDTO(p);
            dto.setImgBase64(imageService.loadImageAsBase64Source(p.getImgLink()));
            dtos.add(dto);
        }
        return dtos;
    }
}
