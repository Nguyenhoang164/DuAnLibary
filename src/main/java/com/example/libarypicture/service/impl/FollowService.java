package com.example.libarypicture.service.impl;

import com.example.libarypicture.model.FollowUser;
import com.example.libarypicture.model.User;
import com.example.libarypicture.repository.IFollowUserRepository;
import com.example.libarypicture.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FollowService {
    @Autowired
    private IFollowUserRepository followUserRepository;
    @Autowired
    private IUserRepository userRepository;
    public boolean followUser(long userId , long followerId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<User> follower = userRepository.findById(followerId);
        Optional<FollowUser> followUser = followUserRepository.findByUserAndUserFollowing(user.get(),follower.get());
        if(followUser.isPresent()) {
            int following = user.get().getFollowing();
            user.get().setFollowing(following - 1);
            userRepository.saveAndFlush(user.get());
            followUserRepository.delete(followUser.get());
        }else{
            int following = user.get().getFollowing();
            user.get().setFollowing(following + 1);
            userRepository.saveAndFlush(user.get());
            FollowUser followUserCreate = new FollowUser();
            LocalDateTime localDateTime = LocalDateTime.now();
            followUserCreate.setCreatedAt(localDateTime);
            followUserCreate.setUserFollowing(follower.get());
            followUserCreate.setUser(user.get());
            followUserRepository.save(followUserCreate);
        }
        return true;
    }
}
