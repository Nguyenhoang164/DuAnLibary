package com.example.libarypicture.service;

import com.example.libarypicture.dto.BlogDTO;
import com.example.libarypicture.model.Blog;

import java.util.List;
import java.util.Optional;

public interface IBlogService {
    boolean saveBlog(BlogDTO Blog);
    void deleteBlog(long id);
    void updateBlog(BlogDTO blogDTO);
    List<Blog> getAllCategories();
    Optional<Blog> getBlogById(long id);
    Iterable<Blog> getAllBlogsByUser(long id);
}
