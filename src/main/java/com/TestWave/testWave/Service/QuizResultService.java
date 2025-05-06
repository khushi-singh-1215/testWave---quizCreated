package com.TestWave.testWave.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TestWave.testWave.Model.StudentQuizResult;
import com.TestWave.testWave.Repository.StudentQuizResultRepository;

@Service
public class QuizResultService {
    @Autowired
    private StudentQuizResultRepository studentQuizResultRepository;

    public List<StudentQuizResult> getQuizResultsForStudent(String studentEmail) {
        
        return studentQuizResultRepository.findTop5ByStudentEmailOrderBySubmissionDateDesc(studentEmail);
    }

    // public List<StudentResultSummaryDTO> getQuizResultSummaryForStudent(String studentEmail) {
    //     List<StudentQuizResult> results = studentQuizResultRepository.findByStudentEmailOrderBySubmissionDateDesc(studentEmail);

    //     return results.stream()
    //         .limit(5)
    //         .map(result -> new StudentResultSummaryDTO(
    //             result.getStudentEmail(),
    //             result.getQuiz().getQuizCode(),
    //             result.getQuiz().getQuizName(),
    //             result.getScore(),
    //             result.getTotal(),
    //             result.getSubmissionDate()
    //         ))
    //         .toList();
    // }
}
