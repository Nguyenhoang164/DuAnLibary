package com.example.libarypicture.service.impl;


import com.example.libarypicture.dto.PictureDTO;
import com.example.libarypicture.dto.PictureForm;
import com.example.libarypicture.model.Category;
import com.example.libarypicture.model.Picture;
import com.example.libarypicture.model.User;
import com.example.libarypicture.repository.IPictureRepository;
import com.example.libarypicture.service.IPictureService;
import com.example.libarypicture.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class PictureService implements IPictureService {
   @Autowired
   private IPictureRepository pictureRepository;
   @Autowired
   private IUserService userService;
    @Override
    public boolean savePicture(PictureForm pictureForm, long userId) {
            MultipartFile multipartFile = pictureForm.getPictureDTO().getFilePicture();
            String filename = multipartFile.getOriginalFilename();
            Picture picture = new Picture();
            picture.setFilePicture("public" + filename);
            picture.setNamePicture(picture.getNamePicture());
            LocalDateTime localDateTime = LocalDateTime.now();
            picture.setTimeCreatePicture(localDateTime);
            Optional<User> userOptional = userService.getUser(userId);
            picture.setUser(userOptional.get());
            Set<Category> categorySet = new HashSet<>(pictureForm.getCategoryList());
            picture.setCategories(categorySet);
            picture.setStatus(pictureForm.getPictureDTO().getStatus());
            picture.setLikePicture(0);
            pictureRepository.save(picture);
            return true;
    }

    @Override
    public boolean deletePicture(long userId) {
        pictureRepository.deleteById(userId);
        return true;
    }

    @Override
    public void likePicture(long pictureId) {
        Optional<Picture> pictureOptional = pictureRepository.findById(pictureId);
        int likeCount = pictureOptional.get().getLikePicture();
        pictureOptional.get().setLikePicture(likeCount + 1);
        pictureRepository.saveAndFlush(pictureOptional.get());
    }


    @Override
    public Optional<Picture> getPicture(long pictureId) {
        return pictureRepository.findById(pictureId);
    }

    @Override
    public Iterable<Picture> getAllPicturesByUserId(long userId) {
        return pictureRepository.findByUserId(userId);
    }

    @Override
    public Iterable<Picture> getAllPicture() {
        return pictureRepository.findAll();
    }
}
