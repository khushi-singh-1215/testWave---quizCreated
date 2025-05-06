package com.TestWave.testWave.Controller;

import com.TestWave.testWave.Service.TeacherService;
import com.TestWave.testWave.Model.Teacher;
import com.TestWave.testWave.Repository.TeacherRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherRepository teacherRepository;
    
    // Create a new teacher profile
    @PostMapping("/create")
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher createdTeacher = teacherService.createTeacher(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeacher);
    }

    

    // Fetch teacher by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Teacher> getTeacherByEmail(@PathVariable String email) {
        // Optional<Teacher> teacher = teacherService.getTeacherByEmail(email);
        // return teacher.map(ResponseEntity::ok)
        //               .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());

        Teacher teacher = teacherRepository.findByEmail(email);
        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(teacher);
    }
}
