package com.TestWave.testWave.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String teacherId; 
    // private String profilePic;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getTeacherId() {
        return teacherId;
    }
    
    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    // public String getProfilePic() {
    //     return profilePic;
    // }

    // public void setProfilePic(String profilePic) {
    //     this.profilePic = profilePic;
    // }
}
