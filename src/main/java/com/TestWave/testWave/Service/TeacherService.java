package com.TestWave.testWave.Service;

import com.TestWave.testWave.Model.Teacher;
import com.TestWave.testWave.Repository.TeacherRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    // Create a new teacher profile
    public Teacher createTeacher(Teacher teacher) {
        long count = teacherRepository.count() + 1;
        String customId = String.format("TEACH25%03d", count);
        teacher.setTeacherId(customId);

        return teacherRepository.save(teacher);
    }

    public Teacher getTeacherByEmail(String email) {
        return teacherRepository.findByEmail(email);
    }
    
}
