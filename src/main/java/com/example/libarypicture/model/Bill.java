package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @ManyToOne
    @JoinColumn(name = "id_picture")
    private Picture picture;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
    private String status;

}
