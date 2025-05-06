package com.TestWave.testWave.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TestWave.testWave.Model.Student;
import com.TestWave.testWave.Repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student createStudent(Student student) {
        long count = studentRepository.count() + 25001;
        student.setStudentId("STUD" + count);
        return studentRepository.save(student);
    }

    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    
}
