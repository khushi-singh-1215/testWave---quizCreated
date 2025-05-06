package com.TestWave.testWave.Repository;

import com.TestWave.testWave.Model.CorrectAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CorrectAnswerRepository extends JpaRepository<CorrectAnswer, Long> {
    List<CorrectAnswer> findByQuestionId(Long questionId); // Add this line
}
