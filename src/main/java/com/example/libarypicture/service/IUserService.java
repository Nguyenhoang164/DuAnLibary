package com.example.libarypicture.service;

import com.example.libarypicture.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    boolean saveUser(User user);
    void updateUser(User user);
    void updateStatusUser(User user);
    List<User> getUsers();
    Optional<User> getUser(long id);
    Optional<User> login(String username, String password);
    boolean updatePremium(long userId);
}
