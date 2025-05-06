package com.TestWave.testWave.DTO;

public class SubmittedAnswerDTO {
    private Long questionId;
    private Integer selectedAnswerIndex;

    public SubmittedAnswerDTO() {}

    public SubmittedAnswerDTO(Long questionId, Integer selectedAnswerIndex) {
        this.questionId = questionId;
        this.selectedAnswerIndex = selectedAnswerIndex;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Integer getSelectedAnswerIndex() {
        return selectedAnswerIndex;
    }

    public void setSelectedAnswerIndex(Integer selectedAnswerIndex) {
        this.selectedAnswerIndex = selectedAnswerIndex;
    }

    @Override
    public String toString() {
        return "SubmittedAnswer{" +
                "questionId=" + questionId +
                ", selectedAnswerIndex=" + selectedAnswerIndex +
                '}';
    }
}
