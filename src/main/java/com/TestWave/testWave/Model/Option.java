package com.TestWave.testWave.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "question_options")
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // primary key

    private String optionText;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question; // foreign key

    public Option() {}

    public Option(String optionText, Question question) {
        this.optionText = optionText;
        this.question = question;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOptionText() { return optionText; }
    public void setOptionText(String optionText) { this.optionText = optionText; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }
}