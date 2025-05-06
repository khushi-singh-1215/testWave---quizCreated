package com.TestWave.testWave.Repository;

import com.TestWave.testWave.Model.Quiz;
import com.TestWave.testWave.Model.StudentQuizResult;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentQuizResultRepository extends JpaRepository<StudentQuizResult, Long> {
    List<StudentQuizResult> findTop5ByStudentEmailOrderBySubmissionDateDesc(String studentEmail);
    List<StudentQuizResult> findByStudentEmailOrderBySubmissionDateDesc(String studentEmail);
    void deleteByQuiz(Quiz quiz);
}
