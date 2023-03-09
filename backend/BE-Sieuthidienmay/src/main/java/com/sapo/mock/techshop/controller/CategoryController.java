package com.sapo.mock.techshop.controller;

import com.sapo.mock.techshop.dto.response.CategoryDTO;
import com.sapo.mock.techshop.dto.response.GeneralResponse;
import com.sapo.mock.techshop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/dashboard/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping()
    public GeneralResponse<?> getAll(){
        return GeneralResponse.ok(categoryService.getAll());
    }

    @GetMapping("/{id}")
    public GeneralResponse<?> getById(@PathVariable("id") Integer id){
        return GeneralResponse.ok(categoryService.getById(id));
    }

    @PostMapping()
    public GeneralResponse<?> create(@RequestBody CategoryDTO categoryDTO){
        return GeneralResponse.ok(categoryService.create(categoryDTO));
    }

    @PostMapping("/{id}")
    public GeneralResponse<?> updateById(@PathVariable("id") Integer id,@RequestBody CategoryDTO categoryDTO){
        return GeneralResponse.ok(categoryService.updateById(id, categoryDTO));
    }

    @DeleteMapping("/{id}")
    public GeneralResponse<?> deleteById(@PathVariable("id") Integer id){
        categoryService.deleteById(id);
        return GeneralResponse.ok(null);
    }

    @GetMapping("/name-contains")
    public GeneralResponse<?> getAllByNameContains(@RequestParam(name = "name") String name){
        return GeneralResponse.ok(categoryService.getAllByNameContains(name));
    }
}
