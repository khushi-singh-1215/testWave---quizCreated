package com.TestWave.testWave.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "student_quiz_results")
public class StudentQuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentEmail;

    private String quizCode;

    private LocalDateTime submissionDate;

    private int score; 
    private int total;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<SubmittedAnswer> submittedAnswers;

    public StudentQuizResult() {}

    public StudentQuizResult(String studentEmail, String quizCode) {
        this.studentEmail = studentEmail;
        this.quizCode = quizCode;
        this.submissionDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getStudentEmail() { return studentEmail; }
    public String getQuizCode() { return quizCode; }
    public LocalDateTime getSubmissionDate() { return submissionDate; }
    public List<SubmittedAnswer> getSubmittedAnswers() { return submittedAnswers; }
    public int getScore() { return score; }                    // Getter
    public int getTotal() { return total; } 

    public void setId(Long id) { this.id = id; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }
    public void setQuizCode(String quizCode) { this.quizCode = quizCode; }
    public void setSubmissionDate(LocalDateTime submissionDate) { this.submissionDate = submissionDate; }
    public void setSubmittedAnswers(List<SubmittedAnswer> submittedAnswers) { this.submittedAnswers = submittedAnswers; }
    public void setScore(int score) { this.score = score; }    // Setter
    public void setTotal(int total) { this.total = total; } 

    public Quiz getQuiz() { return quiz; }

    public void setQuiz(Quiz quiz) {this.quiz = quiz;}

}
