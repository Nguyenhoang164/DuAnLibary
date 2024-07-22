package com.example.libarypicture.repository;

import com.example.libarypicture.model.FollowUser;
import com.example.libarypicture.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface IFollowUserRepository extends JpaRepository<FollowUser, Long> {
    Iterable<FollowUser> findAllByUserFollowingId(long followerId);
    Optional<FollowUser> findByUserAndUserFollowing(User user , User follower);
}
