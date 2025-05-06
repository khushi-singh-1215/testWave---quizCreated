package com.TestWave.testWave.DTO;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.TestWave.testWave.Model.CorrectAnswer;
import com.TestWave.testWave.Repository.CorrectAnswerRepository;

public class PracticeQuizResultDTO {
    private int score;
    private int total;

    // Constructor for initializing score and total
    public PracticeQuizResultDTO(int score, int total) {
        this.score = score;
        this.total = total;
    }

    // Getters and setters
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    // Method for evaluating the quiz result
    @Autowired
    private CorrectAnswerRepository correctAnswerRepository;

    public PracticeQuizResultDTO evaluatePracticeQuiz(PracticeQuizSubmissionDTO request) {
        List<SubmittedAnswerDTO> answers = request.getAnswers();
        int score = 0;
        int total = answers.size() * 2; // Assuming each question is worth 2 points
    
        for (SubmittedAnswerDTO submitted : answers) {
            Long questionId = submitted.getQuestionId();
            Integer selectedIndex = submitted.getSelectedAnswerIndex();
    
            // Ensure selectedIndex is not null
            if (selectedIndex != null) {
                // Fetch correct answers for the question
                List<CorrectAnswer> correctAnswers = correctAnswerRepository.findByQuestionId(questionId);
    
                // Check if the selected answer is correct
                boolean isCorrect = correctAnswers.stream()
                        .anyMatch(ans -> ans.getAnswerIndex().equals(selectedIndex));
    
                if (isCorrect) {
                    score += 2; // Add 2 points for correct answers
                }
            }
        }
    
        return new PracticeQuizResultDTO(score, total);
    }
    
}
