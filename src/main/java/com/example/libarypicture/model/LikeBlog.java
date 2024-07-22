package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class LikeBlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Blog blog;

    public LikeBlog(Blog blog, User user) {
        this.blog = blog;
        this.user = user;
    }

    public LikeBlog() {

    }
}
