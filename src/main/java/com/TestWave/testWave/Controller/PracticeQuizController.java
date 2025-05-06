package com.TestWave.testWave.Controller;

import com.TestWave.testWave.DTO.PracticeQuizResultDTO;
import com.TestWave.testWave.DTO.PracticeQuizSubmissionDTO;
import com.TestWave.testWave.Model.Question;
import com.TestWave.testWave.Service.PracticeQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practice-quiz")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PracticeQuizController {

    @Autowired
    private PracticeQuizService practiceQuizService;

    // Get 5 random questions for practice
    @GetMapping("/random")
    public ResponseEntity<List<Question>> getRandomQuestions() {
        return ResponseEntity.ok(practiceQuizService.getRandomQuestions(5));
    }

    // Submit answers and evaluate result
    @PostMapping("/submit")
    public ResponseEntity<PracticeQuizResultDTO> submitPracticeQuiz(@RequestBody PracticeQuizSubmissionDTO request) {
    PracticeQuizResultDTO result = practiceQuizService.evaluatePracticeQuiz(request);
    return ResponseEntity.ok(result);
}

}
