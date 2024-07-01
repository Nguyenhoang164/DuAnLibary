package com.example.libarypicture.service;

import com.example.libarypicture.model.CategoryDetail;

import java.util.Optional;

public interface ICategoryDetailService {
    void saveCategoryDetail(CategoryDetail categoryDetail);
    void updateCategoryDetail(CategoryDetail categoryDetail);
    Optional<CategoryDetail> getCategoryDetailById(long id);
}
