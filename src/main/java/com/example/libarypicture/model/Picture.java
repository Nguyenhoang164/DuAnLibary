package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Data
@Table(name = "picture")
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filePicture;
    private String namePicture;
    private LocalDateTime timeCreatePicture;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
    @ManyToMany(mappedBy = "pictures")
    private Set<Category> categories ;
    private String status;
    private int likePicture;




}
