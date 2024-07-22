package com.example.libarypicture.service.impl;

import com.example.libarypicture.model.Role;
import com.example.libarypicture.model.User;
import com.example.libarypicture.repository.IRollRepository;
import com.example.libarypicture.repository.IUserRepository;
import com.example.libarypicture.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IRollRepository rollRepository;
    @Override
    public boolean saveUser(User user) {
        Iterable<User> userIterable = userRepository.findAll();
        for (User userFind : userIterable) {
            if (userFind.getUsername().toLowerCase().equals(user.getUsername().toLowerCase()) || userFind.getEmail().toLowerCase().equals(user.getEmail().toLowerCase()) ) {
                return false;
            }
        }
        user.setStatus("Chưa kích hoạt");
        Optional<Role> role = rollRepository.findById(2L);
        user.setRole(role.get());
        LocalDateTime localDateTime = LocalDateTime.now();
        user.setCreatedAt(localDateTime);
        userRepository.save(user);
        return true;
    }

    @Override
    public void updateUser(User user) {
         userRepository.saveAndFlush(user);
    }

    @Override
    public void updateStatusUser(User user) {
        if (user.getStatus().equals("Chưa kích hoạt")){
            user.setStatus("Đã kích hoạt");
            userRepository.saveAndFlush(user);
        }else if(user.getStatus().equals("Đã kích hoạt")){
            user.setStatus("Đã bị chặn");
            userRepository.saveAndFlush(user);
        }else if(user.getStatus().equals("Đã bị chặn")) {
            user.setStatus("Đã kích hoạt");
            userRepository.saveAndFlush(user);
        }
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUser(long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> login(String username, String password) {
        Optional<User> userFindByEmailOrUserName = userRepository.findByEmail(username);
        if (userFindByEmailOrUserName.isEmpty()){
            userFindByEmailOrUserName = userRepository.findByUsername(username);
        }
        Iterable<User> userIterable = userRepository.findAll();
        if (userFindByEmailOrUserName.isPresent()){
            for (User user : userIterable){
                if (user.getEmail().equals(userFindByEmailOrUserName.get().getEmail()) && user.getPassword().equals(userFindByEmailOrUserName.get().getPassword()) ||
                        user.getUsername().equals(userFindByEmailOrUserName.get().getUsername()) && user.getPassword().equals(userFindByEmailOrUserName.get().getPassword())){
                    return userFindByEmailOrUserName;
                }
            }
            return null;
        }
        return null;
    }

    @Override
    public boolean updatePremium(long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.get().getRole().getName().equals("user")){
            Optional<Role> role = rollRepository.findById(3L);
            user.get().setRole(role.get());
            userRepository.saveAndFlush(user.get());
            return true;
        }else if(user.get().getRole().getName().equals("vip")){
            Optional<Role> role = rollRepository.findById(2L);
            user.get().setRole(role.get());
            userRepository.saveAndFlush(user.get());
            return true;
        }
        return false;
    }
    public boolean updatePassword(String email){
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()){
            return false;
        }else{
            userOptional.get().setPassword("abc1234");
            userRepository.saveAndFlush(userOptional.get());
            return true;
        }
    }
}
