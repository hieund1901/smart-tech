package com.sapo.mock.techshop.controller;

import com.sapo.mock.techshop.dto.request.OrderRequestDTO;
import com.sapo.mock.techshop.dto.response.GeneralResponse;
import com.sapo.mock.techshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/dashboard/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping()
    public GeneralResponse<?> getAll(){
        return GeneralResponse.ok(orderService.getAll());
    }

    @GetMapping("/{id}")
    public GeneralResponse<?> getById(@PathVariable("id") Integer id){
        return GeneralResponse.ok(orderService.getById(id));
    }

    @PostMapping()
    public GeneralResponse<?> create(@RequestBody OrderRequestDTO orderRequestDTO){
        return GeneralResponse.ok(orderService.create(orderRequestDTO));
    }

    @PostMapping("/{id}")
    public GeneralResponse<?> updateById(@PathVariable("id") Integer id, @RequestBody OrderRequestDTO orderRequestDTO){
        return GeneralResponse.ok(orderService.updateById(id,orderRequestDTO));
    }

    @DeleteMapping("/{id}")
    public GeneralResponse<?> deleteById(@PathVariable("id") Integer id){
        orderService.deleteById(id);
        return GeneralResponse.ok(null);
    }

    @GetMapping("/name-contains")
    public GeneralResponse<?> getAllByNameContains(@RequestParam String name){
        return GeneralResponse.ok(orderService.getAllByNameContains(name));
    }
}
