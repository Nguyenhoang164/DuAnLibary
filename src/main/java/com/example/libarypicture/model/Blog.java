package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
public class Blog {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String description;
    private String likePage;
    private LocalDateTime localDateTime;
    @ManyToOne
    @JoinColumn(name= "id_user")
    private User user;
}
