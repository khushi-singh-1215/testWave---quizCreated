package com.TestWave.testWave.Repository;

import com.TestWave.testWave.Model.Quiz;
// import com.TestWave.testWave.Model.Teacher;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    
    // List<Quiz> findByActiveTrue(); 
    
    Optional<Quiz> findByQuizCode(String quizCode);
    List<Quiz> findByCreatedBy(String email);

    // @Query("SELECT q FROM Quiz q JOIN FETCH q.questions WHERE q.id = :id")
    // Quiz findQuizWithQuestions(@Param("id") Long id);
}
