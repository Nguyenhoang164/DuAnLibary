package com.example.libarypicture.repository;

import com.example.libarypicture.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.xml.stream.events.Comment;
@Repository
public interface ICommentsRepository extends JpaRepository<Comments, Long> {
    Iterable<Comments> findAllByBlogId(long blogId);
}
