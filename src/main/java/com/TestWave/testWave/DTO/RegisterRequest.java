package com.TestWave.testWave.DTO;

import com.TestWave.testWave.Model.Role; 

public class RegisterRequest {
    private String email;
    private String password;
    private Role role;
    private String otp; 

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getOtp() { 
        return otp;
    }

    public void setOtp(String otp) { 
        this.otp = otp;
    }
}
