package com.example.libarypicture.repository;

import com.example.libarypicture.model.Blog;
import com.example.libarypicture.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBlogRepository extends JpaRepository<Blog, Long> {
    Iterable<Blog> findByUser(User user);
}
