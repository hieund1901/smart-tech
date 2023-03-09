package com.sapo.mock.techshop.service;

import com.sapo.mock.techshop.dto.response.CollectionDTO;
import com.sapo.mock.techshop.dto.response.CollectionResponseDTO;
import com.sapo.mock.techshop.entity.Collection;

import java.util.List;

public interface CollectionService {
    List<CollectionResponseDTO> getAll();
    Collection getById(Integer id);
    Collection create(CollectionDTO collectionDTO);
    Collection updateById(Integer id, CollectionDTO collectionDTO);
    void deleteById(Integer id);
    List<Collection> getAllByNameContains(String name);
}