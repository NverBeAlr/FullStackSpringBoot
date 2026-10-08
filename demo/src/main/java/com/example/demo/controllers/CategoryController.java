package com.example.demo.controllers;

import com.example.demo.services.CategoryService;
import com.example.demo.entities.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired 
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{Id}")
    public Category getCategoryById(@PathVariable Long Id) {
        return categoryService.getCategoryById(Id);
    }

    @PostMapping("/create")
    public String createCategory(@RequestBody Category category) {
        categoryService.createCategory(category);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateCategory(@PathVariable Long Id, @RequestBody Category category) {
        categoryService.updateCategory(Id, category);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteCategory(@PathVariable Long Id) {
        categoryService.deleteCategory(Id);
        return "Xóa thành công";
    }
}