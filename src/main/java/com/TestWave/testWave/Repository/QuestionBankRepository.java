package com.TestWave.testWave.Repository;

import com.TestWave.testWave.Model.QuestionBank;
import com.TestWave.testWave.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {
    List<QuestionBank> findByCreatedBy(Teacher teacher);
    // List<QuestionBank> findByCreatedBy(String createdBy);
}
