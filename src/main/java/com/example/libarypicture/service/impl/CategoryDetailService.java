package com.example.libarypicture.service.impl;

import com.example.libarypicture.model.CategoryDetail;
import com.example.libarypicture.repository.ICategoryDetailRepository;
import com.example.libarypicture.service.ICategoryDetailService;
import com.example.libarypicture.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryDetailService implements ICategoryDetailService {
    @Autowired
    private ICategoryDetailRepository categoryDetailRepository;
    @Override
    public void saveCategoryDetail(CategoryDetail categoryDetail) {
        categoryDetailRepository.save(categoryDetail);
    }

    @Override
    public void updateCategoryDetail(CategoryDetail categoryDetail) {
       categoryDetailRepository.saveAndFlush(categoryDetail);
    }

    @Override
    public Optional<CategoryDetail> getCategoryDetailById(long id) {
        return categoryDetailRepository.findByCategoryId(id);
    }
}
