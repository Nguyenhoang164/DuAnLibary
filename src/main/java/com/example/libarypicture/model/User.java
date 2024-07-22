package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = true)
    private String amount;
    @Column(unique = true,nullable = false)
    private String email;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
    private String status;
    private int follow;
    private int following;
    private LocalDateTime createdAt;
}
