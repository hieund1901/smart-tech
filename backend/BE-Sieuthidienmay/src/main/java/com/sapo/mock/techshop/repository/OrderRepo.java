package com.sapo.mock.techshop.repository;

import com.sapo.mock.techshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    List<Order> findAllByNameContainsIgnoreCase(String name);
}
