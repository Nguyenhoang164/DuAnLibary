package com.example.libarypicture.dto;

import com.example.libarypicture.model.Blog;
import com.example.libarypicture.model.Picture;
import com.example.libarypicture.model.User;

public class BlogSend {
    private Blog blog;
    private Picture picture;
    private User user;

    public BlogSend(Blog blog, Picture picture, User user) {
        this.blog = blog;
        this.picture = picture;
        this.user = user;
    }

    public BlogSend() {
    }

    public Blog getBlog() {
        return blog;
    }

    public BlogSend setBlog(Blog blog) {
        this.blog = blog;
        return this;
    }

    public Picture getPicture() {
        return picture;
    }

    public BlogSend setPicture(Picture picture) {
        this.picture = picture;
        return this;
    }

    public User getUser() {
        return user;
    }

    public BlogSend setUser(User user) {
        this.user = user;
        return this;
    }
}
