package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class FollowUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_Follow")
    private User user;
    @ManyToOne
    @JoinColumn(name = "user_Following")
    private User userFollowing;
    private LocalDateTime createdAt;
}
