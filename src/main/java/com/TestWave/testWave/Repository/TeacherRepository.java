package com.TestWave.testWave.Repository;

import com.TestWave.testWave.Model.Teacher;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    // Optional<Teacher> findByEmail(String email);
    Teacher findByEmail(String email);

}
