package com.TestWave.testWave.Service;

import com.TestWave.testWave.DTO.QuizSubmissionRequest;
import com.TestWave.testWave.DTO.SubmittedAnswerDTO;
import com.TestWave.testWave.Model.Quiz;
import com.TestWave.testWave.Model.StudentQuizResult;
import com.TestWave.testWave.Repository.QuizRepository;
import com.TestWave.testWave.Repository.StudentQuizResultRepository;
import com.TestWave.testWave.Repository.SubmittedAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class QuizSubmissionService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private StudentQuizResultRepository studentQuizResultRepository;

    @Autowired
    private SubmittedAnswerRepository submittedAnswerRepository;

    public void submitAnswers(QuizSubmissionRequest submissionRequest) {
        String studentEmail = submissionRequest.getStudentEmail();
        String quizCode = submissionRequest.getQuizCode();
        List<SubmittedAnswerDTO> answers = submissionRequest.getAnswers();

        System.out.println("Received submission from: " + studentEmail);
        System.out.println("Quiz Code: " + quizCode);
        System.out.println("Answers: " + answers);

        Optional<Quiz> quizOpt = quizRepository.findByQuizCode(quizCode);
        if (quizOpt.isEmpty()) {
            System.out.println("Quiz not found for code: " + quizCode);
            return;
        }

        Quiz quiz = quizOpt.get();

        // Create the StudentQuizResult
        StudentQuizResult result = new StudentQuizResult();
        result.setQuiz(quiz);
        result.setStudentEmail(studentEmail);
        result.setQuizCode(quizCode);
        result.setSubmissionDate(LocalDateTime.now());

        // Save result first to get its ID
        StudentQuizResult savedResult = studentQuizResultRepository.save(result);

        // Convert DTO answers to Entity and link with result
        List<com.TestWave.testWave.Model.SubmittedAnswer> submittedAnswerEntities = new ArrayList<>();

        for (SubmittedAnswerDTO answer : answers) {
            com.TestWave.testWave.Model.SubmittedAnswer answerEntity = new com.TestWave.testWave.Model.SubmittedAnswer();
            answerEntity.setQuestionId(answer.getQuestionId());
            answerEntity.setSelectedAnswerIndex(Collections.singletonList(answer.getSelectedAnswerIndex()));
            answerEntity.setResult(savedResult);


            submittedAnswerEntities.add(answerEntity);
        }

        // Save all submitted answers
        submittedAnswerRepository.saveAll(submittedAnswerEntities);

        System.out.println("Submission saved successfully.");
    }
}
