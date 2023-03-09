package com.sapo.mock.techshop.repository;

import com.sapo.mock.techshop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    List<Category> findAllByNameContainsIgnoreCase(String name);
}
