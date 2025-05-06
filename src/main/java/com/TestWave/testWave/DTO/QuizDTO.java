package com.TestWave.testWave.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
public class QuizDTO {
    private String quizName;
    private int totalQuestions;
    private int quizTime;
    //private int totalMarks;
    private boolean equalWeightage;
    private String quizCode;

    private List<QuestionDTO> questions;
    private List<Long> questionIds;

    public List<Long> getQuestionIds() {
        // return questions.stream()
        //         .map(QuestionDTO::getId) // Assuming QuestionDTO has a getId() method
        //         .collect(Collectors.toList());

        if (questionIds != null) {
            return questionIds;
        }
        if (questions != null) {
            return questions.stream()
                    .map(QuestionDTO::getId) // Extract IDs from QuestionDTO
                    .collect(Collectors.toList());
        }
        return null;
    }

    // Ensure questions are populated when retrieving a quiz
    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
        if (questions != null) {
            this.questionIds = questions.stream()
                    .map(QuestionDTO::getId)
                    .collect(Collectors.toList());
        }
    }

    public String getQuizCode() {
        return quizCode;
    }
    
    public void setQuizCode(String quizCode) {
        this.quizCode = quizCode;
    }

    // Ensure questionIds are set separately when creating a quiz
    public void setQuestionIds(List<Long> questionIds) {
        this.questionIds = questionIds;
    }

    // Getters
    public String getQuizName() { return quizName; }
    public int getTotalQuestions() { return totalQuestions; }
    public int getQuizTime() { return quizTime; }
    //public int getTotalMarks() { return totalMarks; }
    public boolean isEqualWeightage() { return equalWeightage; }
    public List<QuestionDTO> getQuestions() { return questions; }

    // Setters
    public void setQuizName(String quizName) { this.quizName = quizName; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
    public void setQuizTime(int quizTime) { this.quizTime = quizTime; }
    //public void setTotalMarks(int totalMarks) { this.totalMarks = totalMarks; }
    public void setEqualWeightage(boolean equalWeightage) { this.equalWeightage = equalWeightage; }
    // public void setQuestions(List<QuestionDTO> questions) { this.questions = questions; }
    
}
