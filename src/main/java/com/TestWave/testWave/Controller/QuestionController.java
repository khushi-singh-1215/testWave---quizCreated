package com.TestWave.testWave.Controller;

import com.TestWave.testWave.DTO.QuestionDTO;
import com.TestWave.testWave.Model.Question;
import com.TestWave.testWave.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
@Validated
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Get all questions
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    // Get question by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Question>> getQuestionById(@PathVariable Long id) {
        Optional<Question> question = questionService.getQuestionById(id);
        return question.isPresent() ? ResponseEntity.ok(question) : ResponseEntity.notFound().build();
    }

    // Save multiple questions
    @PostMapping("/{questionBankId}")
    public ResponseEntity<List<Question>> saveQuestionsToBank(
            @PathVariable Long questionBankId,
            @RequestBody List<QuestionDTO> questionDTOs) {
        List<Question> savedQuestions = questionService.saveQuestions(questionDTOs, questionBankId);
        return ResponseEntity.ok(savedQuestions);
    }

    // Delete a question by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    //fetch all question bank
    @GetMapping("/bank/{questionBankId}")
    public ResponseEntity<List<Question>> getQuestionsByBank(@PathVariable Long questionBankId) {
        List<Question> questions = questionService.getQuestionsByQuestionBank(questionBankId);
        return questions.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(questions);
    }

}