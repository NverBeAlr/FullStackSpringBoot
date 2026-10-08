package com.example.demo.services;

import com.example.demo.Repositories.CategoryRepository;
import com.example.demo.entities.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired 
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long Id) {
        return categoryRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy category phù hợp"));
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long Id, Category category) {
        Category existingCategory = getCategoryById(Id);
        existingCategory.setName(category.getName());
        return categoryRepository.save(existingCategory);
    }

    public Category deleteCategory(Long Id) {
        Category existingCategory = getCategoryById(Id);
        categoryRepository.delete(existingCategory);
        return existingCategory;
    }
}