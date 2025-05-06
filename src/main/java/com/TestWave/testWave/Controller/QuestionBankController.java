package com.TestWave.testWave.Controller;

import com.TestWave.testWave.DTO.QuestionBankDTO;
import com.TestWave.testWave.Model.QuestionBank;
import com.TestWave.testWave.Model.Teacher;
import com.TestWave.testWave.Repository.QuestionBankRepository;
import com.TestWave.testWave.Repository.TeacherRepository;
import com.TestWave.testWave.Service.QuestionBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question-banks")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionBankController {

    @Autowired
    private QuestionBankService questionBankService;

    @Autowired
    private TeacherRepository teacherRepository;

    @PostMapping
    public ResponseEntity<QuestionBank> create(@RequestBody QuestionBankDTO dto) {
        return ResponseEntity.ok(questionBankService.createQuestionBank(dto.getName(), dto.getTeacherEmail()));
    }

    @GetMapping("/teacher")
    public ResponseEntity<List<QuestionBank>> getByTeacher(@RequestParam String email) {
        return ResponseEntity.ok(questionBankService.getQuestionBanksByTeacher(email));
    }
    @Autowired
    private QuestionBankRepository questionBankRepository;

    //question bank created by particular teacher
    @GetMapping("/questionsteacher/{email}")
    public ResponseEntity<List<QuestionBank>> getQuestionBanksByTeacherEmail(@PathVariable String email) {
        Teacher teacher = teacherRepository.findByEmail(email);
        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }

        List<QuestionBank> banks = questionBankRepository.findByCreatedBy(teacher);
        return ResponseEntity.ok(banks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestionBank(@PathVariable Long id) {
        try {
            questionBankService.deleteQuestionBank(id);
            return ResponseEntity.ok("Question bank deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete question bank.");
        }
    }

}
