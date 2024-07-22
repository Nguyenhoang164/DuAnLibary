package com.example.libarypicture.dto;

import com.example.libarypicture.model.Blog;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class BlogDTO {
    private MultipartFile multipartFile;
    private Blog blog;

    public BlogDTO(MultipartFile multipartFile, Blog blog) {
        this.multipartFile = multipartFile;
        this.blog = blog;
    }

    public Blog getBlog() {
        return blog;
    }

    public BlogDTO setBlog(Blog blog) {
        this.blog = blog;
        return this;
    }

    public MultipartFile getMultipartFile() {
        return multipartFile;
    }

    public BlogDTO setMultipartFile(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
        return this;
    }
}
