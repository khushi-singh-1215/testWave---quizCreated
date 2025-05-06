package com.TestWave.testWave.Service;

import com.TestWave.testWave.DTO.PracticeQuizResultDTO;
import com.TestWave.testWave.DTO.PracticeQuizSubmissionDTO;
import com.TestWave.testWave.DTO.SubmittedAnswerDTO;
// import com.TestWave.testWave.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PracticeQuizSubmissionService {

    @Autowired
    private QuestionService questionService;

    public PracticeQuizResultDTO submitPracticeQuiz(PracticeQuizSubmissionDTO submissionRequest) {
        String studentEmail = submissionRequest.getStudentEmail();
        List<SubmittedAnswerDTO> answers = submissionRequest.getAnswers();

        System.out.println("Received practice submission from: " + studentEmail);

        int score = 0;
        int total = answers.size() * 2;

        for (SubmittedAnswerDTO submitted : answers) {
            Long questionId = submitted.getQuestionId();
            int selectedIndex = submitted.getSelectedAnswerIndex();

            List<Integer> correctIndexes = questionService.getCorrectAnswerIndexesByQuestionId(questionId);

            if (correctIndexes.contains(selectedIndex)) {
                score += 2;
            }
        }

        System.out.println("Practice submission evaluated. Score: " + score + "/" + total);

        return new PracticeQuizResultDTO(score, total);
    }
}
