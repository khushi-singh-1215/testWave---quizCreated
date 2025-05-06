package com.TestWave.testWave.Repository;

import com.TestWave.testWave.Model.SubmittedAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmittedAnswerRepository extends JpaRepository<SubmittedAnswer, Long> {
}
