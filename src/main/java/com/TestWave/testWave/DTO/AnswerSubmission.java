package com.TestWave.testWave.DTO;

public class AnswerSubmission {
    private Long questionId;
    private Integer selectedAnswerIndex;

    // Getters and Setters
    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Integer getSelectedAnswerIndex() { return selectedAnswerIndex; }
    public void setSelectedAnswerIndex(Integer selectedAnswerIndex) { this.selectedAnswerIndex = selectedAnswerIndex; }
}
