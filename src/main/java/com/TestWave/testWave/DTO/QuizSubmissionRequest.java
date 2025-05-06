package com.TestWave.testWave.DTO;

import java.util.List;

public class QuizSubmissionRequest {
    private String studentEmail;
    private String quizCode;
    private List<SubmittedAnswerDTO> answers;

    public QuizSubmissionRequest() {}

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getQuizCode() {
        return quizCode;
    }

    public void setQuizCode(String quizCode) {
        this.quizCode = quizCode;
    }

    public List<SubmittedAnswerDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<SubmittedAnswerDTO> answers) {
        this.answers = answers;
    }
}
