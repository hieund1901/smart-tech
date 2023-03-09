package com.sapo.mock.techshop.service;

import com.sapo.mock.techshop.dto.request.ProductRequestDTO;
import com.sapo.mock.techshop.dto.response.ProductForDetailDTO;
import com.sapo.mock.techshop.dto.response.ProductForHomePageDTO;
import com.sapo.mock.techshop.dto.response.ProductDashboardResponseDTO;
import com.sapo.mock.techshop.entity.Product;

import java.util.List;

public interface ProductService {
    List<ProductDashboardResponseDTO> getAll();
    ProductDashboardResponseDTO getById(Integer id);
    Product create(ProductRequestDTO productDTO);
    Product updateById(Integer id, ProductRequestDTO productDTO);
    void deleteById(Integer id);
    List<ProductForHomePageDTO> getTopProductsByCategory(Integer count, Integer categoryId);
    List<ProductForDetailDTO> findProductByCollectionId(Integer collectionId);

    List<ProductForDetailDTO> getAllByNameContains(String name);
}
