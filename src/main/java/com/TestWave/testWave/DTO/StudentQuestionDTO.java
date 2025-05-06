package com.TestWave.testWave.DTO;

import lombok.Data;
import java.util.List;

@Data
public class StudentQuestionDTO {
    private Long id;
    private String questionText;
    private List<String> options;
}
