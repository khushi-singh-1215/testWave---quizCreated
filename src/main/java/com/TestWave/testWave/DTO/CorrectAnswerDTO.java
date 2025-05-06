package com.TestWave.testWave.DTO;

public class CorrectAnswerDTO {

    private Long id; // ID of the correct answer
    private int answerIndex; // Index of the correct answer in the options list (starts from 0)
    private String correctAnswerText; // Text of the correct answer

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAnswerIndex() {
        return answerIndex;
    }

    public void setAnswerIndex(int answerIndex) {
        this.answerIndex = answerIndex;
    }

    public String getCorrectAnswerText() {
        return correctAnswerText;
    }

    public void setCorrectAnswerText(String correctAnswerText) {
        this.correctAnswerText = correctAnswerText;
    }
}
