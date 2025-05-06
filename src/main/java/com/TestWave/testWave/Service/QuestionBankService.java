package com.TestWave.testWave.Service;

import com.TestWave.testWave.Model.QuestionBank;
import com.TestWave.testWave.Model.Teacher;
import com.TestWave.testWave.Repository.QuestionBankRepository;
import com.TestWave.testWave.Repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionBankService {

    @Autowired
    private QuestionBankRepository questionBankRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public QuestionBank createQuestionBank(String name, String teacherEmail) {
        Teacher teacher = teacherRepository.findByEmail(teacherEmail);
        if (teacher == null) {
            throw new RuntimeException("Teacher not found");
        }
        QuestionBank qb = new QuestionBank(name, teacher);
        return questionBankRepository.save(qb);
    }

    public List<QuestionBank> getQuestionBanksByTeacher(String teacherEmail) {
        Teacher teacher = teacherRepository.findByEmail(teacherEmail);
        if (teacher == null) {
            throw new RuntimeException("Teacher not found");
        }
        return questionBankRepository.findByCreatedBy(teacher);
    }

    public List<QuestionBank> getQuestionBanksByTeacherEmail(Teacher email) {
        return questionBankRepository.findByCreatedBy(email);
    }

    public void deleteQuestionBank(Long id) {
        questionBankRepository.deleteById(id);
    }
    
    
}
