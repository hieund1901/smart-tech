package com.sapo.mock.techshop.repository;

import com.sapo.mock.techshop.dto.response.ProductForHomePageDTO;

import java.util.List;

public interface ProductRepoCustom {
    List<ProductForHomePageDTO> getTopProductsByCategory(Integer count, Integer categoryId);
}
