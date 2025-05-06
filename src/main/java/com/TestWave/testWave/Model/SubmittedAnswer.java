package com.TestWave.testWave.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "submitted_answers")
public class SubmittedAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long questionId;

    //private Integer selectedAnswerIndex;
    @ElementCollection
    @CollectionTable(name = "submitted_answer_indices", joinColumns = @JoinColumn(name = "submitted_answer_id"))
    @Column(name = "answer_index")
    private List<Integer> selectedAnswerIndex;


    @ManyToOne
    @JoinColumn(name = "result_id")
    @JsonBackReference
    private StudentQuizResult result;

    public SubmittedAnswer() {}

    public SubmittedAnswer(Long questionId, List<Integer> selectedAnswerIndex, StudentQuizResult result) {
        this.questionId = questionId;
        this.selectedAnswerIndex = selectedAnswerIndex;
        this.result = result;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public Long getQuestionId() { return questionId; }
    public List<Integer> getSelectedAnswerIndex() { return selectedAnswerIndex; }
    public StudentQuizResult getResult() { return result; }

    public void setId(Long id) { this.id = id; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }
    public void setSelectedAnswerIndex(List<Integer> selectedAnswerIndex) {
        this.selectedAnswerIndex = selectedAnswerIndex;
    }
    public void setResult(StudentQuizResult result) { this.result = result; }
}
