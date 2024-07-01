package com.example.libarypicture.dto;

import com.example.libarypicture.model.Category;
import com.example.libarypicture.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class PictureDTO {
    private Long id;
    private MultipartFile filePicture;
    private String namePicture;
    private LocalDateTime timeCreatePicture;
    private User user;
    private List<Category> categories ;
    private String status;

    public PictureDTO(Long id, MultipartFile filePicture, String namePicture, LocalDateTime timeCreatePicture, User user, List<Category> categories, String status) {
        this.id = id;
        this.filePicture = filePicture;
        this.namePicture = namePicture;
        this.timeCreatePicture = timeCreatePicture;
        this.user = user;
        this.categories = categories;
        this.status = status;
    }

    public PictureDTO() {
    }

    public Long getId() {
        return id;
    }

    public PictureDTO setId(Long id) {
        this.id = id;
        return this;
    }

    public MultipartFile getFilePicture() {
        return filePicture;
    }

    public PictureDTO setFilePicture(MultipartFile filePicture) {
        this.filePicture = filePicture;
        return this;
    }

    public String getNamePicture() {
        return namePicture;
    }

    public PictureDTO setNamePicture(String namePicture) {
        this.namePicture = namePicture;
        return this;
    }

    public LocalDateTime getTimeCreatePicture() {
        return timeCreatePicture;
    }

    public PictureDTO setTimeCreatePicture(LocalDateTime timeCreatePicture) {
        this.timeCreatePicture = timeCreatePicture;
        return this;
    }

    public User getUser() {
        return user;
    }

    public PictureDTO setUser(User user) {
        this.user = user;
        return this;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public PictureDTO setCategories(List<Category> categories) {
        this.categories = categories;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public PictureDTO setStatus(String status) {
        this.status = status;
        return this;
    }
}
