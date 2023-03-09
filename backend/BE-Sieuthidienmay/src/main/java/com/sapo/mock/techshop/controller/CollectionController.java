package com.sapo.mock.techshop.controller;

import com.sapo.mock.techshop.dto.response.CollectionDTO;
import com.sapo.mock.techshop.dto.response.GeneralResponse;
import com.sapo.mock.techshop.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/dashboard/collections")
public class CollectionController {

    @Autowired
    CollectionService collectionService;

    @GetMapping()
    public GeneralResponse<?> getAll(){
        return GeneralResponse.ok(collectionService.getAll());
    }
    @GetMapping("/{id}")
    public GeneralResponse<?> getById(@PathVariable("id") Integer id){
        return GeneralResponse.ok(collectionService.getById(id));
    }
    @PostMapping()
    public GeneralResponse<?> create(@RequestBody CollectionDTO collectionDTO){
        return GeneralResponse.ok(collectionService.create(collectionDTO));
    }
    @PostMapping("/{id}")
    public GeneralResponse<?> updateById(@PathVariable("id") Integer id, @RequestBody CollectionDTO collectionDTO){
        return GeneralResponse.ok(collectionService.updateById(id, collectionDTO));
    }
    @DeleteMapping("/{id}")
    public GeneralResponse<?> deleteById(@PathVariable("id") Integer id){
        collectionService.deleteById(id);
        return GeneralResponse.ok(null);
    }

    @GetMapping("/name-contains")
    public GeneralResponse<?> getAllByNameContains(@RequestParam String name){
        return GeneralResponse.ok(collectionService.getAllByNameContains(name));
    }
}
