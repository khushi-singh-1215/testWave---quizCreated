package com.TestWave.testWave.Model;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String text;

    private int marks = 2;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorrectAnswer> correctAnswers = new ArrayList<>();

    // Many-to-Many relationship with Quiz
    // @JsonIgnore
    // @ManyToMany(mappedBy = "questions", fetch = FetchType.LAZY)
    // private List<Quiz> quizzes = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "question_bank_id")
    @JsonBackReference
    @JsonIgnore
    private QuestionBank questionBank;

    public QuestionBank getQuestionBank() {
        return questionBank;
    }

    public void setQuestionBank(QuestionBank questionBank) {
        this.questionBank = questionBank;
    }
    
    public Question() {}

    public Question(String type, String text, List<Option> options, List<CorrectAnswer> correctAnswers) {
        this.type = type;
        this.text = text;
        this.options = options;
        this.correctAnswers = correctAnswers;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public List<Option> getOptions() { return options; }
    public void setOptions(List<Option> options) { 
        this.options = options; 
        for (Option option : options) {
            option.setQuestion(this); // Set the back reference
        }
    }

    public List<CorrectAnswer> getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(List<CorrectAnswer> correctAnswers) { 
        this.correctAnswers = correctAnswers; 
        for (CorrectAnswer correctAnswer : correctAnswers) {
            correctAnswer.setQuestion(this); // Set the back reference
        }
    }

    // public List<Quiz> getQuizzes() { return quizzes; }
    // public void setQuizzes(List<Quiz> quizzes) { this.quizzes = quizzes; }

    public int getMarks() { return marks; }
    public void setMarks(int marks) { this.marks = marks; }

}
