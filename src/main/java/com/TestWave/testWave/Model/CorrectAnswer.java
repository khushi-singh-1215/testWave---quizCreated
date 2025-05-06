package com.TestWave.testWave.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "question_correct_answers")
public class CorrectAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer answerIndex;

    private String correctAnswerText;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    public CorrectAnswer() {}

    public CorrectAnswer(Integer answerIndex, Question question) {
        this.answerIndex = answerIndex;
        this.question = question;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getAnswerIndex() { return answerIndex; }
    public void setAnswerIndex(Integer answerIndex) { this.answerIndex = answerIndex; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public String getCorrectAnswerText() { return correctAnswerText; }
    public void setCorrectAnswerText(String correctAnswerText) { this.correctAnswerText = correctAnswerText; }
}