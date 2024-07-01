package com.example.libarypicture.service;

import com.example.libarypicture.model.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    boolean saveCategory(Category category);
    void deleteCategory(long id);
    void updateCategory(Category category);
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(long id);
}
