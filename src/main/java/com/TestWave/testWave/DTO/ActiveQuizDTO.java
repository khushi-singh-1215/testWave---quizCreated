package com.TestWave.testWave.DTO;

public class ActiveQuizDTO {
    private Long id;
    private String quizName;
    private int totalQuestions;

    public ActiveQuizDTO(Long id, String quizName, int totalQuestions) {
        this.id = id;
        this.quizName = quizName;
        this.totalQuestions = totalQuestions;
    }

    public Long getId() {
        return id;
    }

    public String getQuizName() {
        return quizName;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}
