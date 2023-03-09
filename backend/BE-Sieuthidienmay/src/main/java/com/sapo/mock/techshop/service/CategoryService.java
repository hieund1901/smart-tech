package com.sapo.mock.techshop.service;

import com.sapo.mock.techshop.dto.response.CategoryDTO;
import com.sapo.mock.techshop.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();
    Category getById(Integer id);
    Category create(CategoryDTO categoryDTO);
    Category updateById(Integer id, CategoryDTO categoryDTO);
    void deleteById(Integer id);
    List<Category> getAllByNameContains(String name);
}
