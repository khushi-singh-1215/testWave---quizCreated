package com.TestWave.testWave.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TestWave.testWave.Model.StudentQuizResult;
import com.TestWave.testWave.Service.QuizResultService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")  
@RequestMapping("/api/quizzes/results")
public class QuizResultController {
    
    @Autowired
    private QuizResultService quizResultService;

    @GetMapping("/student/{studentEmail}")
    public ResponseEntity<List<StudentQuizResult>> getStudentQuizResults(@PathVariable String studentEmail) {
        List<StudentQuizResult> results = quizResultService.getQuizResultsForStudent(studentEmail);
        
        // If there are more than 5 results, return only the latest 5
        if (results.size() > 5) {
            results = results.subList(0, 5); // Get only the first 5 results
        }
        
        return ResponseEntity.ok(results);
    }
}
