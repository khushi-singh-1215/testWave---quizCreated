package com.TestWave.testWave.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String quizCode;
    // private Long questionBankId;
    private int totalQuestions;
    private boolean equalWeightage;
    private String createdBy; // teacherEmail
    private LocalDateTime createdAt;
    private String quizName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_bank_id", nullable = false)
    private QuestionBank questionBank;

    // Many-to-Many relationship with Questions using JoinTable
    public QuestionBank getQuestionBank() {
        return questionBank;
    }

    public void setQuestionBank(QuestionBank questionBank) {
        this.questionBank = questionBank;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuizCode() {
        return quizCode;
    }

    public void setQuizCode(String quizCode) {
        this.quizCode = quizCode;
    }

    // public Long getQuestionBankId() {
    //     return questionBankId;
    // }

    // public void setQuestionBankId(Long questionBankId) {
    //     this.questionBankId = questionBankId;
    // }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }
}
