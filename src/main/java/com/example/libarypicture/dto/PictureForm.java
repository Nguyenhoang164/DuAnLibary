package com.example.libarypicture.dto;

import com.example.libarypicture.model.Category;
import com.example.libarypicture.model.Picture;

import java.util.List;

public class PictureForm {
    private PictureDTO pictureDTO;
    private List<Category> categoryList;

    public PictureForm(PictureDTO pictureDTO, List<Category> categoryList) {
        this.pictureDTO = pictureDTO;
        this.categoryList = categoryList;
    }

    public PictureDTO getPictureDTO() {
        return pictureDTO;
    }

    public PictureForm setPictureDTO(PictureDTO pictureDTO) {
        this.pictureDTO = pictureDTO;
        return this;
    }

    public List<Category> getCategoryList() {
        return categoryList;
    }

    public PictureForm setCategoryList(List<Category> categoryList) {
        this.categoryList = categoryList;
        return this;
    }
}
