package com.TestWave.testWave.DTO;

import java.util.List;

public class PracticeQuizSubmissionDTO {
    private String studentEmail;
    private List<SubmittedAnswerDTO> answers;

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public List<SubmittedAnswerDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<SubmittedAnswerDTO> answers) {
        this.answers = answers;
    }
}
