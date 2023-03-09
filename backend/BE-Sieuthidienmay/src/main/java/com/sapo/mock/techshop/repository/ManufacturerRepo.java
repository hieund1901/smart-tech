package com.sapo.mock.techshop.repository;

import com.sapo.mock.techshop.entity.Category;
import com.sapo.mock.techshop.entity.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManufacturerRepo extends JpaRepository<Manufacturer, Integer> {
    List<Manufacturer> findAllByNameContainsIgnoreCase(String name);
}
