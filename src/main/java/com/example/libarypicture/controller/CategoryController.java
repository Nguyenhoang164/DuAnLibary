package com.example.libarypicture.controller;

import com.example.libarypicture.model.Category;
import com.example.libarypicture.model.CategoryDetail;
import com.example.libarypicture.model.User;
import com.example.libarypicture.service.impl.CategoryDetailService;
import com.example.libarypicture.service.impl.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(value = "*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryDetailService categoryDetailService;
    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        Collections.reverse(categories);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @GetMapping("/getTenCategory")
    public ResponseEntity<List<Category>> getAllCategoriesTen() {
        List<Category> categories = categoryService.getAllCategories();
        Collections.reverse(categories);
        List<Category> topTenCategories = categories.subList(0, Math.min(10, categories.size()));
        return new ResponseEntity<>(topTenCategories, HttpStatus.OK);
    }
    @PostMapping("/createCategory")
    public ResponseEntity<String> createCategory(@RequestBody Category category) {
       boolean status = categoryService.saveCategory(category);
       String answer;
       if (status) {
           answer = "Category created successfully";
       }else{
           answer = "Category already exists";
       }
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }
    @PutMapping("/updateCategory")
    public ResponseEntity<String> updateCategory(@RequestBody Category category) {
        categoryService.updateCategory(category);
        return new ResponseEntity<>("Category updated successfully", HttpStatus.OK);
    }
    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
    }
    @PostMapping("/createCategoryDetail")
    public ResponseEntity<String> createCategoryDetail(@RequestBody CategoryDetail categoryDetail) {
        categoryDetailService.saveCategoryDetail(categoryDetail);
        return new ResponseEntity<>("CategoryDetail created successfully", HttpStatus.OK);
    }
    @PutMapping("/updateCategoryDetail")
    public ResponseEntity<String> updateCategoryDetail(@RequestBody CategoryDetail categoryDetail) {
        categoryDetailService.updateCategoryDetail(categoryDetail);
        return new ResponseEntity<>("CategoryDetail updated successfully", HttpStatus.OK);
    }
    @GetMapping("/categoryDetail/{id}")
    public ResponseEntity<Optional<CategoryDetail>> getAllCategoryDetails(@PathVariable long id) {
        Optional<CategoryDetail> categoryDetail = categoryDetailService.getCategoryDetailById(id);
        return new ResponseEntity<>(categoryDetail, HttpStatus.OK);
    }
}
