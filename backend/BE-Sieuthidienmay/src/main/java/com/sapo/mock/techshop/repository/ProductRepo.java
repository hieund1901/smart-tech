package com.sapo.mock.techshop.repository;

import com.sapo.mock.techshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findProductByCollectionId(Integer collectionId);

    List<Product> findAllByNameContainsIgnoreCase(String name);
}
