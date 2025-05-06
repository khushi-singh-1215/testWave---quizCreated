package com.TestWave.testWave.DTO;

public class QuizCreationRequest {
    private String quizName;
    private Long questionBankId;
    private int totalQuestions;
    private boolean equalWeightage;
    private String createdBy; // teacher email

    // Getters and Setters
    public String getQuizName(){
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public Long getQuestionBankId() {
        return questionBankId;
    }

    public void setQuestionBankId(Long questionBankId) {
        this.questionBankId = questionBankId;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public boolean isEqualWeightage() {
        return equalWeightage;
    }

    public void setEqualWeightage(boolean equalWeightage) {
        this.equalWeightage = equalWeightage;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
