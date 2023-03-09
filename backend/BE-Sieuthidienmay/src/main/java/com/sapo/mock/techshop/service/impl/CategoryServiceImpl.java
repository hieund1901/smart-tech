package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.common.exception.BusinessException;
import com.sapo.mock.techshop.common.utils.DTOValidator;
import com.sapo.mock.techshop.dto.response.CategoryDTO;
import com.sapo.mock.techshop.entity.Category;
import com.sapo.mock.techshop.mapper.CategoryMapper;
import com.sapo.mock.techshop.repository.CategoryRepo;
import com.sapo.mock.techshop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import static com.sapo.mock.techshop.common.constant.HttpStatusConstant.CATEGORY_NOT_FOUND_MESSAGE;
import static com.sapo.mock.techshop.common.constant.HttpStatusConstant.NOT_FOUND_CODE;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private DTOValidator dtoValidator;

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<Category> getAll() {
        List<Category> categories = categoryRepo.findAll();
        categories.sort(Comparator.reverseOrder());
        return categories;
    }

    @Override
    public Category getById(Integer id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE,CATEGORY_NOT_FOUND_MESSAGE));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Category create(CategoryDTO categoryDTO) {
        dtoValidator.validate(categoryDTO);
        Category category = categoryMapper.createEntity(categoryDTO);
        return categoryRepo.save(category);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Category updateById(Integer id, CategoryDTO categoryDTO) {
        dtoValidator.validate(categoryDTO);
        Category category = getById(id);
        categoryMapper.updateEntity(category,categoryDTO);
        return category;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteById(Integer id) {
        getById(id);
        categoryRepo.deleteById(id);
    }

    @Override
    public List<Category> getAllByNameContains(String name) {
        List<Category> categories = categoryRepo.findAllByNameContainsIgnoreCase(name);
        categories.sort(Comparator.reverseOrder());
        return categories;
    }
}
