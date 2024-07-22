package com.example.libarypicture.repository;

import com.example.libarypicture.model.Blog;
import com.example.libarypicture.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPictureRepository extends JpaRepository<Picture, Long> {
    Optional<Picture> findByBlog(Blog blog);

}
