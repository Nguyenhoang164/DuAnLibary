package com.example.libarypicture.dto;

public class UserLoginDTO {
    private String usernameOrEmail;
    private String password;

    public UserLoginDTO(String usernameOrEmail, String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }

    public UserLoginDTO() {
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public UserLoginDTO setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserLoginDTO setPassword(String password) {
        this.password = password;
        return this;
    }
}
