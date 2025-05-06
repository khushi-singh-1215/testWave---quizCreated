package com.TestWave.testWave.Model;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "otp_table")
public class OtpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String otp;

    @Column(nullable = false)
    private Instant expiryTime;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    //  No-arg constructor (required by JPA)
    public OtpEntity() {}

    //  Our main constructor for creating new OTP records
    public OtpEntity(String email, String otp) {
        this.email = email;
        this.otp = otp;
        this.createdAt = Instant.now();
        this.expiryTime = this.createdAt.plusSeconds(300); // expires in 5 minutes
    }

    public boolean isExpired() {
        return expiryTime.isBefore(Instant.now());
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public Instant getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Instant expiryTime) {
        this.expiryTime = expiryTime;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
