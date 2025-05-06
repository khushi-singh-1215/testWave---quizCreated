package com.TestWave.testWave.Service;

import com.TestWave.testWave.DTO.PracticeQuizSubmissionDTO;
import com.TestWave.testWave.DTO.PracticeQuizResultDTO;
import com.TestWave.testWave.DTO.SubmittedAnswerDTO;
import com.TestWave.testWave.Model.CorrectAnswer;
import com.TestWave.testWave.Model.Question;
import com.TestWave.testWave.Repository.CorrectAnswerRepository;
import com.TestWave.testWave.Repository.QuestionRepository;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PracticeQuizService {

    @Autowired
    private CorrectAnswerRepository correctAnswerRepository;

    @Autowired
        private QuestionRepository questionRepository;


    public PracticeQuizResultDTO evaluatePracticeQuiz(PracticeQuizSubmissionDTO request) {
        List<SubmittedAnswerDTO> answers = request.getAnswers(); // List of answers from the student

        int score = 0;
        int total = answers.size() * 2; // Each question is worth 2 points

        for (SubmittedAnswerDTO submitted : answers) {
            Long questionId = submitted.getQuestionId();
            Integer selectedIndex = submitted.getSelectedAnswerIndex();

            if (selectedIndex == null) {
                System.out.println("Warning: selectedAnswerIndex is null for question ID " + questionId);
                continue; // Skip this answer if no selection was made
            }

            // Fetch correct answers for the question
            List<CorrectAnswer> correctAnswers = correctAnswerRepository.findByQuestionId(questionId);

            // Check if the selected answer is correct
            boolean isCorrect = correctAnswers.stream()
                    .anyMatch(ans -> ans.getAnswerIndex() == selectedIndex);

            if (isCorrect) {
                score += 2;  // Add 2 points for correct answers
            }
        }        
        return new PracticeQuizResultDTO(score, total); // Return the result DTO
    }

    public List<Question> getRandomQuestions(int count) {
        List<Question> allQuestions = questionRepository.findAll();
        Collections.shuffle(allQuestions);
        return allQuestions.stream().limit(count).toList();
    }
}
