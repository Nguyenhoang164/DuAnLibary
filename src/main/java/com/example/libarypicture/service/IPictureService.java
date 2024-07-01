package com.example.libarypicture.service;

import com.example.libarypicture.dto.PictureDTO;
import com.example.libarypicture.dto.PictureForm;
import com.example.libarypicture.model.Picture;

import java.util.Optional;

public interface IPictureService {
    boolean savePicture (PictureForm pictureForm, long userId);
    boolean deletePicture (long userId);
    void likePicture (long pictureId);
    Optional<Picture> getPicture (long pictureId);
    Iterable<Picture> getAllPicturesByUserId(long userId);
    Iterable<Picture> getAllPicture();
}
