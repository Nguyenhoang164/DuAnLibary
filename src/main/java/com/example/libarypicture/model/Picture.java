package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "picture")
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filePicture;
    @ManyToOne
    @JoinColumn(name = "id_blog")
    private Blog blog ;
}
