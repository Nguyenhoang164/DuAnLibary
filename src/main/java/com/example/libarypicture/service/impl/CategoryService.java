package com.example.libarypicture.service.impl;

import com.example.libarypicture.model.Category;
import com.example.libarypicture.model.CategoryDetail;
import com.example.libarypicture.repository.ICategoryDetailRepository;
import com.example.libarypicture.repository.ICategoryRepository;
import com.example.libarypicture.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;
    @Autowired
    private ICategoryDetailRepository categoryDetailRepository;
    @Override
    public boolean saveCategory(Category category) {
        Iterable<Category> categories = categoryRepository.findAll();
        for (Category c : categories) {
            if (c.getName().equals(category.getName())) {
                return false;
            }

        }
        categoryRepository.save(category);
        return true;
    }

    @Override
    public void deleteCategory(long id) {
        Optional<CategoryDetail> categoryDetail = categoryDetailRepository.findByCategoryId(id);
        if (categoryDetail.isPresent()) {
            categoryDetailRepository.deleteByCategoryId(id);
        }
         categoryRepository.deleteById(id);
    }

    @Override
    public void updateCategory(Category category) {
        categoryRepository.saveAndFlush(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(long id) {
        return categoryRepository.findById(id);
    }
}
