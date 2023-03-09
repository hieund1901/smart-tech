package com.sapo.mock.techshop.repository;

import com.sapo.mock.techshop.entity.OrderProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductDetailRepo extends JpaRepository<OrderProductDetail, Integer> {
}
