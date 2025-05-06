package com.TestWave.testWave.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.TestWave.testWave.Model.OtpEntity;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    
    Optional<OtpEntity> findTopByEmailOrderByCreatedAtDesc(String email);

    @Transactional
    @Modifying
    void deleteByEmail(String email);
}
