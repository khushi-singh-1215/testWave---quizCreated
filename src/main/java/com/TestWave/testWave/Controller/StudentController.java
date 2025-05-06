package com.TestWave.testWave.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TestWave.testWave.Model.Student;
import com.TestWave.testWave.Service.StudentService;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // @GetMapping("/{studentId}")
    // public ResponseEntity<Student> getStudentByStudentId(@PathVariable String studentId) {
    //     Optional<Student> student = studentService.getStudentByStudentId(studentId);
    //     return student.map(ResponseEntity::ok)
    //             .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    // }

    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Optional<Student> student = studentService.getStudentByEmail(email);
        return student.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
