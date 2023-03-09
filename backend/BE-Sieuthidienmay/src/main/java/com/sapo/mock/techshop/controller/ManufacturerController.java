package com.sapo.mock.techshop.controller;

import com.sapo.mock.techshop.dto.response.ManufacturerDTO;
import com.sapo.mock.techshop.dto.response.GeneralResponse;
import com.sapo.mock.techshop.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/dashboard/manufacturers")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @GetMapping()
    public GeneralResponse<?> getAll(){
        return GeneralResponse.ok(manufacturerService.getAll());
    }

    @GetMapping("/{id}")
    public GeneralResponse<?> getById(@PathVariable("id") Integer id){
        return GeneralResponse.ok(manufacturerService.getById(id));
    }

    @PostMapping()
    public GeneralResponse<?> create(@RequestBody ManufacturerDTO manufacturerDTO){
        return GeneralResponse.ok(manufacturerService.create(manufacturerDTO));
    }

    @PostMapping("/{id}")
    public GeneralResponse<?> updateById(@PathVariable("id") Integer id,@RequestBody ManufacturerDTO manufacturerDTO){
        return GeneralResponse.ok(manufacturerService.updateById(id, manufacturerDTO));
    }

    @DeleteMapping("/{id}")
    public GeneralResponse<?> deleteById(@PathVariable("id") Integer id){
        manufacturerService.deleteById(id);
        return GeneralResponse.ok(null);
    }

    @GetMapping("/name-contains")
    public GeneralResponse<?> getAllByNameContains(@RequestParam String name){
        return GeneralResponse.ok(manufacturerService.getAllByNameContains(name));
    }
}
