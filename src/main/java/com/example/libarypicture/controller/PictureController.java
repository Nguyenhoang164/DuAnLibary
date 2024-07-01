package com.example.libarypicture.controller;

import com.example.libarypicture.dto.PictureDTO;
import com.example.libarypicture.dto.PictureForm;
import com.example.libarypicture.model.Picture;
import com.example.libarypicture.service.impl.PictureService;
import com.example.libarypicture.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/pictures")
@CrossOrigin(value = "*")
public class PictureController {
    @Autowired
    private PictureService pictureService;
    @Autowired
    private UserService userService;
    @GetMapping("")
    public ResponseEntity<Iterable<Picture>> getAllPictures() {
        Iterable<Picture> pictureIterable = pictureService.getAllPicture();
        List<Picture> pictureList = new ArrayList<>();
        for (Picture picture : pictureIterable) {
            pictureList.add(picture);
        }
        Collections.shuffle(pictureList);
        Iterable<Picture> pictureIterableResult = pictureList;
        return new ResponseEntity<>(pictureIterableResult, HttpStatus.OK);
    }
    @PostMapping("/createPicture/{userId}")
    public ResponseEntity<Boolean> createPicture(@RequestBody PictureForm pictureForm , @PathVariable long userId) {
        boolean statusCreatePicture = pictureService.savePicture(pictureForm,userId);
        if (statusCreatePicture){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/deletePicture/{id}")
    public ResponseEntity<Boolean> deletePicture(@PathVariable long id) {
        boolean statusDeletePicture = pictureService.deletePicture(id);
        if (statusDeletePicture){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }
}
