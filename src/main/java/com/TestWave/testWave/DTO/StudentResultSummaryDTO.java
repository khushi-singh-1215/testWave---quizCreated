package com.TestWave.testWave.DTO;

import java.time.LocalDateTime;

public class StudentResultSummaryDTO {
    private String studentEmail;
    private String quizCode;
    private String quizTitle;
    private int score;
    private int total;
    private LocalDateTime submissionDate;

    public StudentResultSummaryDTO(String studentEmail, String quizCode, String quizTitle, int score, int total, LocalDateTime submissionDate) {
        this.studentEmail = studentEmail;
        this.quizCode = quizCode;
        this.quizTitle = quizTitle;
        this.score = score;
        this.total = total;
        this.submissionDate = submissionDate;
    }

    // Getters and setters
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

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }
}
