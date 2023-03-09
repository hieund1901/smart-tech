package com.sapo.mock.techshop.service;

import com.sapo.mock.techshop.dto.response.ManufacturerDTO;
import com.sapo.mock.techshop.entity.Manufacturer;

import java.util.List;

public interface ManufacturerService {
    List<Manufacturer> getAll();
    Manufacturer getById(Integer id);
    Manufacturer create(ManufacturerDTO manufacturerDTO);
    Manufacturer updateById(Integer id, ManufacturerDTO manufacturerDTO);
    void deleteById(Integer id);
    List<Manufacturer> getAllByNameContains(String name);
}
