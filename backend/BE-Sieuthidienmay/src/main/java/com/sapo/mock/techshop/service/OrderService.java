package com.sapo.mock.techshop.service;

import com.sapo.mock.techshop.dto.request.OrderRequestDTO;
import com.sapo.mock.techshop.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAll();

    Order getById(Integer id);

    Order create(OrderRequestDTO orderRequestDTO);

    Order updateById(Integer id, OrderRequestDTO orderRequestDTO);

    void deleteById(Integer id);

    List<Order> getAllByNameContains(String name);

}
