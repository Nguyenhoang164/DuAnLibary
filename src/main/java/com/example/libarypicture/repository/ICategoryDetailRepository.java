package com.example.libarypicture.repository;

import com.example.libarypicture.model.CategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICategoryDetailRepository extends JpaRepository<CategoryDetail, Long> {
    void deleteByCategoryId(long categoryId);
    Optional<CategoryDetail> findByCategoryId(long categoryId);
}
