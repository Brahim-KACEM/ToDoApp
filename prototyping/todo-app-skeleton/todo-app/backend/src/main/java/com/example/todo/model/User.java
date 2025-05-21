package com.example.todo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user")  // ✅ Avoid reserved word "user
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;

    public User() {}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }


    public String getEmail() {
    return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    
}
