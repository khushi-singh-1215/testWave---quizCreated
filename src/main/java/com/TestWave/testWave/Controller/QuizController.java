package com.TestWave.testWave.Controller;


import com.TestWave.testWave.DTO.QuestionDTO;
import com.TestWave.testWave.DTO.QuizCreationRequest;
import com.TestWave.testWave.DTO.QuizDTO;
import com.TestWave.testWave.Model.Question;
import com.TestWave.testWave.Model.QuestionBank;
import com.TestWave.testWave.Model.Quiz;
import com.TestWave.testWave.Repository.QuestionBankRepository;
import com.TestWave.testWave.Repository.QuizRepository;
import com.TestWave.testWave.Service.QuizService;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:5173")  
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionBankRepository questionBankRepository;

    @Autowired
    private QuizService quizService;

    private String generateUniqueCode() {
        int length = 8;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = (int) (Math.random() * chars.length());
            code.append(chars.charAt(randomIndex));
        }
        return code.toString();
    }
    
    @PostMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestBody QuizCreationRequest request) {
        Quiz quiz = new Quiz();
        quiz.setQuizCode(generateUniqueCode()); // Generate unique quiz code
        
        // Fetch the QuestionBank by ID
        QuestionBank qb = questionBankRepository.findById(request.getQuestionBankId())
            .orElseThrow(() -> new RuntimeException("Question bank not found"));
    
        // Set properties of the Quiz entity
        quiz.setQuestionBank(qb);
        quiz.setQuizName(request.getQuizName()); // Set the quiz name from the request
        quiz.setTotalQuestions(request.getTotalQuestions());
        quiz.setEqualWeightage(request.isEqualWeightage());
        quiz.setCreatedBy(request.getCreatedBy()); // Set the teacher's ID from the request
        quiz.setCreatedAt(LocalDateTime.now());
        
        // Save the quiz to the repository
        quizRepository.save(quiz);
    
        // Return the quiz code in the response
        return ResponseEntity.ok(quiz.getQuizCode());
    }
    
    
    @GetMapping("/generate")
    public ResponseEntity<List<QuestionDTO>> generateQuiz(
            @RequestParam String quizCode,  
            @RequestParam int n,
            @RequestParam boolean equalWeightage) {

        Quiz quiz = quizRepository.findByQuizCode(quizCode)  // Retrieve quiz by quizCode
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        QuestionBank qb = quiz.getQuestionBank();

        List<Question> allQuestions = qb.getQuestions();
        if (allQuestions.size() < n) {
            throw new RuntimeException("Not enough questions in the question bank");
        }

        Collections.shuffle(allQuestions);
        List<Question> selected = allQuestions.subList(0, n);

        if (equalWeightage) {
            for (Question q : selected) {
                q.setMarks(2); // Uniform mark
            }
        }

        List<QuestionDTO> response = selected.stream()
                .map(QuestionDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    

    // find quiz create by particular teacher
    @GetMapping("/teacher/email/{email}")
    public List<QuizDTO> getQuizzesByTeacher(@PathVariable String email) {
        List<Quiz> quizzes = quizService.getQuizzesByTeacherEmail(email);

        return quizzes.stream().map(quiz -> {
            QuizDTO quizDTO = new QuizDTO();
            quizDTO.setQuizName(quiz.getQuizName());
            quizDTO.setQuizCode(quiz.getQuizCode()); 
            quizDTO.setTotalQuestions(quiz.getTotalQuestions());
            quizDTO.setEqualWeightage(quiz.isEqualWeightage());
            return quizDTO;
        }).collect(Collectors.toList());
    }

    //delete quiz
    @DeleteMapping("/{quizCode}")
    public ResponseEntity<String> deleteQuiz(@PathVariable String quizCode) {
        Quiz quiz = quizRepository.findByQuizCode(quizCode)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        quizRepository.delete(quiz);  // Delete the quiz from the database
        return ResponseEntity.ok("Quiz deleted successfully");
    }

    @GetMapping("/allquizzes")
    public ResponseEntity<List<QuizDTO>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        List<QuizDTO> quizDTOs = quizzes.stream().map(quiz -> {
            QuizDTO dto = new QuizDTO();
            dto.setQuizName(quiz.getQuizName());
            dto.setQuizCode(quiz.getQuizCode());
            dto.setTotalQuestions(quiz.getTotalQuestions());
            dto.setEqualWeightage(quiz.isEqualWeightage());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(quizDTOs);
    }

}