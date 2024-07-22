package com.example.libarypicture.service.impl;

import com.example.libarypicture.model.Comments;
import com.example.libarypicture.repository.ICommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {
    @Autowired
    private ICommentsRepository commentsRepository;

    public void commentToPage(Comments comments) {
        LocalDateTime localDateTime = LocalDateTime.now();
        comments.setTimeCreateComments(localDateTime);
        commentsRepository.save(comments);
    }
    public void updateComment(Comments comments) {
        LocalDateTime localDateTime = LocalDateTime.now();
        comments.setTimeCreateComments(localDateTime);
        commentsRepository.saveAndFlush(comments);
    }
    public void deleteComment(Comments comments) {
        commentsRepository.delete(comments);
    }
    public Iterable<Comments> showAllComments(long blogId) {
        return commentsRepository.findAllByBlogId(blogId);
    }
}
