package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.common.exception.BusinessException;
import com.sapo.mock.techshop.common.utils.DTOValidator;
import com.sapo.mock.techshop.dto.response.CollectionDTO;
import com.sapo.mock.techshop.dto.response.CollectionResponseDTO;
import com.sapo.mock.techshop.entity.Category;
import com.sapo.mock.techshop.entity.Collection;
import com.sapo.mock.techshop.entity.Manufacturer;
import com.sapo.mock.techshop.mapper.CollectionMapper;
import com.sapo.mock.techshop.repository.CategoryRepo;
import com.sapo.mock.techshop.repository.CollectionRepo;
import com.sapo.mock.techshop.repository.ManufacturerRepo;
import com.sapo.mock.techshop.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static com.sapo.mock.techshop.common.constant.HttpStatusConstant.*;

@Service
public class CollectionServiceImpl implements CollectionService {

    @Autowired
    CollectionMapper collectionMapper;

    @Autowired
    CollectionRepo collectionRepo;

    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    ManufacturerRepo manufacturerRepo;

    @Autowired
    DTOValidator dtoValidator;

    @Override
    public List<CollectionResponseDTO> getAll() {
        return collectionMapper.toListCollectionResponseDto(collectionRepo.findAll());
    }

    @Override
    public Collection getById(Integer id) {
        return collectionRepo.findById(id)
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE, CATEGORY_NOT_FOUND_MESSAGE));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Collection create(CollectionDTO collectionDTO) {
        dtoValidator.validate(collectionDTO);
        Collection collection = collectionMapper.createEntity(collectionDTO);

        Category category = categoryRepo.findById(collectionDTO.getCategory_id())
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE, CATEGORY_NOT_FOUND_MESSAGE));
        Manufacturer manufacturer = manufacturerRepo.findById(collectionDTO.getManufacturer_id())
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE, MANUFACTURER_NOT_FOUND_MESSAGE));
        collection.setCategory(category);
        collection.setManufacturer(manufacturer);
        return collectionRepo.save(collection);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Collection updateById(Integer id, CollectionDTO collectionDTO) {
        dtoValidator.validate(collectionDTO);
        Collection collection = getById(id);
        collectionMapper.updateEntity(collection,collectionDTO);
        return collection;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteById(Integer id) {
        Collection collection = collectionRepo.findById(id)
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE,CATEGORY_NOT_FOUND_MESSAGE));
        Category thisCategory = collection.getCategory();
        thisCategory.getCollections().remove(collection);
        categoryRepo.save(thisCategory);

        Manufacturer thisManufacturer = collection.getManufacturer();
        thisManufacturer.getCollections().remove(collection);
        manufacturerRepo.save(thisManufacturer);

        collectionRepo.deleteById(id);
    }

    @Override
    public List<Collection> getAllByNameContains(String name) {
        return collectionRepo.findAllByNameContainsIgnoreCase(name);
    }
}