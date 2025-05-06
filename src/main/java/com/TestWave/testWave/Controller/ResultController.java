package com.TestWave.testWave.Controller;


// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.TestWave.testWave.Repository.StudentQuizResultRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")  
public class ResultController {
    // @Autowired
    // private StudentQuizResultRepository studentQuizResultRepository;

    // @GetMapping("/results")
    // public ResponseEntity<List<StudentResultSummaryDTO>> getAllResults() {
    //     List<StudentQuizResult> results = studentQuizResultRepository.findAll();

    //     List<StudentResultSummaryDTO> dtoList = results.stream().map(result -> new StudentResultSummaryDTO(
    //             result.getStudentEmail(),
    //             result.getQuizCode(),
    //             result.getQuiz() != null ? result.getQuiz().getQuizName()
    //             : "Untitled Quiz",
    //             result.getScore(),
    //             result.getTotal(),
    //             result.getSubmissionDate()
    //     )).collect(Collectors.toList());

    //     return ResponseEntity.ok(dtoList);
    // }
}
