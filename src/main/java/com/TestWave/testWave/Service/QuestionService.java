package com.TestWave.testWave.Service;

import com.TestWave.testWave.DTO.QuestionDTO;
import com.TestWave.testWave.Model.CorrectAnswer;
import com.TestWave.testWave.Model.Option;
import com.TestWave.testWave.Model.Question;
import com.TestWave.testWave.Model.QuestionBank;
import com.TestWave.testWave.Model.Quiz;
import com.TestWave.testWave.Repository.CorrectAnswerRepository;
import com.TestWave.testWave.Repository.QuestionBankRepository;
import com.TestWave.testWave.Repository.QuestionRepository;
import com.TestWave.testWave.Repository.QuizRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CorrectAnswerRepository correctAnswerRepository;

    @Autowired
    private QuestionBankRepository questionBankRepository;


    // public List<Question> saveQuestions(List<QuestionDTO> questionDTOs) {
    //     List<Question> savedQuestions = new ArrayList<>();
    //     for (QuestionDTO questionDTO : questionDTOs) {
    //         Question question = new Question();
    //         question.setType(questionDTO.getType());
    //         question.setText(questionDTO.getText());

    //         // Save Options
    //         List<Option> options = new ArrayList<>();
    //         for (String optionText : questionDTO.getOptions()) {
    //             Option option = new Option(optionText, question); // Link to saved question
    //             options.add(option);
    //         }
    //         question.setOptions(options); // Set the options back to the question

    //         // Save Correct Answers
    //         List<CorrectAnswer> correctAnswers = new ArrayList<>();
    //         for (Integer answerIndex : questionDTO.getCorrectAnswers()) {
    //             if (answerIndex >= 0 && answerIndex < options.size()) { // Ensure correct index
    //                 CorrectAnswer correctAnswer = new CorrectAnswer(answerIndex, question);
    //                 correctAnswer.setCorrectAnswerText(options.get(answerIndex).getOptionText());
    //                 correctAnswers.add(correctAnswer);
    //             } else {
    //                 throw new IllegalArgumentException("Invalid correct answer index");
    //             }
    //         }
    //         question.setCorrectAnswers(correctAnswers); // Set the correct answers back to the question

    //         // Save the question along with options and correct answers
    //         savedQuestions.add(questionRepository.save(question));
    //     }
    //     return savedQuestions;
    // }

    public List<Question> saveQuestions(List<QuestionDTO> questionDTOs, Long questionBankId) {
        QuestionBank questionBank = questionBankRepository.findById(questionBankId)
                .orElseThrow(() -> new RuntimeException("Question bank not found"));

        List<Question> savedQuestions = new ArrayList<>();

        for (QuestionDTO questionDTO : questionDTOs) {
            Question question = new Question();
            question.setType(questionDTO.getType());
            question.setText(questionDTO.getText());
            question.setMarks(questionDTO.getMarks()); // if you support marks per question
            question.setQuestionBank(questionBank);

            // Set options
            List<Option> options = new ArrayList<>();
            for (String optionText : questionDTO.getOptions()) {
                Option option = new Option(optionText, question); // assumes Option has a constructor like (String, Question)
                options.add(option);
            }
            question.setOptions(options);

            // Set correct answers
            List<CorrectAnswer> correctAnswers = new ArrayList<>();
            for (Integer index : questionDTO.getCorrectAnswers()) {
                if (index >= 0 && index < options.size()) {
                    CorrectAnswer correctAnswer = new CorrectAnswer(index, question);
                    correctAnswer.setCorrectAnswerText(options.get(index).getOptionText());
                    correctAnswers.add(correctAnswer);
                } else {
                    throw new IllegalArgumentException("Invalid correct answer index: " + index);
                }
            }
            question.setCorrectAnswers(correctAnswers);

            // Save the question with options and correct answers
            savedQuestions.add(questionRepository.save(question));
        }

        return savedQuestions;
    }


    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
            .orElse(null);
    }
    public List<Integer> getCorrectAnswerIndexesByQuestionId(Long questionId) {
    // Fetch from correct_answer table
    return correctAnswerRepository.findByQuestionId(questionId)
            .stream()
            .map(CorrectAnswer::getAnswerIndex)
            .collect(Collectors.toList());
    }

    //fetch all question from db
    public List<Question> getQuestionsByQuestionBank(Long questionBankId) {
        // Fetch the QuestionBank
        QuestionBank questionBank = questionBankRepository.findById(questionBankId)
                .orElseThrow(() -> new RuntimeException("Question bank not found"));
    
        // Return the list of questions associated with the QuestionBank
        return questionBank.getQuestions();
    }
    
}