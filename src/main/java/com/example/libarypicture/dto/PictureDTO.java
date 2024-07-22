package com.example.libarypicture.dto;

import com.example.libarypicture.model.Blog;
import com.example.libarypicture.model.User;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

public class PictureDTO {
    private MultipartFile multipartFile;

    public PictureDTO(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
    }

    public MultipartFile getMultipartFile() {
        return multipartFile;
    }

    public PictureDTO setMultipartFile(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
        return this;
    }
}