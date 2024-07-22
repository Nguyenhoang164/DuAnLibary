package com.example.libarypicture.controller;

import com.example.libarypicture.dto.UserLoginDTO;
import com.example.libarypicture.model.User;
import com.example.libarypicture.repository.IUserRepository;
import com.example.libarypicture.service.impl.FollowService;
import com.example.libarypicture.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(value = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private FollowService followService;

    @GetMapping("/topFiveUser")
    public ResponseEntity<List<User>> getAllUsersTopFive() {
        Iterable<User> users = userService.getUsers();
        List<User> userList = new ArrayList<>();
        for (User user : users) {
            userList.add(user);
        }   
// Lấy 10 phần tử đầu tiên
        Collections.reverse(userList);
        List<User> topFiveUsers = userList.subList(0, Math.min(5, userList.size()));
        return new ResponseEntity<>(topFiveUsers, HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.getUsers();
        Collections.reverse(userList);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }
    @GetMapping("/userVip")
    public ResponseEntity<List<User>> getUserVip() {
        Iterable<User> userList = userRepository.getUserByAmountOrderByAmountAmountAsc();
        List<User> usersVip = new ArrayList<>();
        for (User user : userList) {
            if (user.getRole().getName().equals("vip")){
                usersVip.add(user);
            }
        }
        List<User> topFiveUsers = usersVip.subList(0, Math.min(7, usersVip.size()));
        return new ResponseEntity<>(topFiveUsers, HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<Optional<User>> getUserByLogin(@RequestBody UserLoginDTO userLoginDTO) {
        Optional<User> userOptional = userService.login(userLoginDTO.getUsernameOrEmail(),userLoginDTO.getPassword());
            return new ResponseEntity<>(userOptional,HttpStatus.OK);
    }
    @PostMapping("/resigter")
    public ResponseEntity<String> resigterUser(@RequestBody User user) {
       boolean statusResigter =  userService.saveUser(user);
       String result;
       if(statusResigter) {
           result = "Resigter Success";
       }else{
           result = "Resigter Fail";
       }
       return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @PutMapping("/updateStatus/{userId}")
    public ResponseEntity<Boolean> updateUserStatus(@PathVariable long userId) {
        Optional<User> userOptional = userService.getUser(userId);
         userService.updateStatusUser(userOptional.get());
         return new ResponseEntity<>(true,HttpStatus.OK);
    }
    @PutMapping("/updatePremium/{userId}")
    public ResponseEntity<Boolean> updatePremiumStatus(@PathVariable long userId) {
        boolean status =  userService.updatePremium(userId);
        if(status) {
            return new ResponseEntity<>(true,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false,HttpStatus.OK);
        }
    }
    @GetMapping("/recoveryPassword/{email}")
    public ResponseEntity<Boolean> recoveryPassword(@PathVariable String email) {
        if (email == null || email.isEmpty()) {
            return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
        }
        boolean statusEmail = userService.updatePassword(email);
        if (statusEmail){
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.OK);
    }
    @GetMapping("/admin/{id}")
    public ResponseEntity<Boolean> getAdminById(@PathVariable long id){
        Optional<User> userOptional = userService.getUser(id);
        if (userOptional.isEmpty()){
            return new ResponseEntity<>(false,HttpStatus.OK);
        }else if(userOptional.get().getRole().getName().equals("admin")){
            return new ResponseEntity<>(true,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false,HttpStatus.OK);
        }

    }
    @GetMapping("/user/{id}")
    public ResponseEntity<Optional<User>> findUserById(@PathVariable long id){
        Optional<User> userOptional = userService.getUser(id);
        return new ResponseEntity<>(userOptional,HttpStatus.OK);
    }
    @GetMapping("/followUser/{userId}/{userFollow}")
    public ResponseEntity<Boolean> followUser(@PathVariable long userId, @PathVariable long userFollow){
        boolean statusFollow = followService.followUser(userId, userFollow);
        if (statusFollow){
            return new ResponseEntity<>(true,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(false,HttpStatus.OK);
        }
    }
}
