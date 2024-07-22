package com.example.libarypicture.repository;

import com.example.libarypicture.model.LikeBlog;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface ILikeRepository extends JpaRepository<LikeBlog, Long> {
    Optional<LikeBlog> findByBlogIdAndUserId(long blogId, long userId);
    void deleteByUserIdAndBlogId(long userId, long blogId);
}
