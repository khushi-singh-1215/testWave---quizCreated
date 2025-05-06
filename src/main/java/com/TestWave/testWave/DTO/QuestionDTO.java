package com.TestWave.testWave.DTO;

import java.util.List;
import java.util.stream.Collectors;

import com.TestWave.testWave.Model.Option;
import com.TestWave.testWave.Model.Question;

public class QuestionDTO {
    private Long id;
    private String type; // or use QuestionType enum if you implemented it
    private String text;
    private List<String> options;
    private List<Integer> correctAnswers;
    private int marks;

    public static QuestionDTO fromEntity(Question q) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(q.getId());
        dto.setText(q.getText());
        dto.setMarks(q.getMarks());
        dto.setOptions(q.getOptions().stream()
                .map(Option::getOptionText)
                .collect(Collectors.toList()));
        return dto;
    }
    // Getters and Setters

    public Long getId() { return id; } 
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public List<Integer> getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(List<Integer> correctAnswers) { this.correctAnswers = correctAnswers; }

    public int getMarks() { return marks; } // ✅ Add getter
    public void setMarks(int marks) { this.marks = marks; } // ✅ Add setter

    // public int getquestionBankId(){return questionBankId; }
    // public void setquestionBankId()

    

}