// package com.TestWave.testWave.Service;

// import com.TestWave.testWave.DTO.ActiveQuizDTO;
// import com.TestWave.testWave.DTO.QuestionDTO;
// import com.TestWave.testWave.DTO.QuizDTO;
// import com.TestWave.testWave.DTO.StudentQuestionDTO;
// import com.TestWave.testWave.Model.Option;
// import com.TestWave.testWave.Model.Question;
// import com.TestWave.testWave.Model.Quiz;
// import com.TestWave.testWave.Repository.QuestionRepository;
// import com.TestWave.testWave.Repository.QuizRepository;
// import com.TestWave.testWave.Repository.StudentQuizResultRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;
// import java.util.Map;
// import java.util.UUID;
// import java.util.stream.Collectors;
// import java.util.Optional;

// @Service
// public class QuizService {

//     @Autowired
//     private QuizRepository quizRepository;

//     @Autowired
//     private QuestionRepository questionRepository;

//     @Autowired
//     private StudentQuizResultRepository studentQuizResultRepository;

//     @Transactional
//     public Quiz createQuiz(QuizDTO quizDTO) {
        
//         if (quizDTO == null) {
//             throw new IllegalArgumentException("Received null quizDTO!");
//         }
    
//         if (quizDTO.getQuestionIds() == null || quizDTO.getQuestionIds().isEmpty()) {
//             throw new IllegalArgumentException("Question IDs are missing in request!");
//         }
    
//         System.out.println("Received QuizDTO: " + quizDTO); // Log the DTO before querying DB

        
//         List<Question> selectedQuestions = questionRepository.findAllById(quizDTO.getQuestionIds());
        
//         // Log the fetched questions
//         System.out.println("Fetched Questions: " + selectedQuestions);
        
//         if (selectedQuestions.size() != quizDTO.getQuestionIds().size()) {
//             throw new IllegalArgumentException("Some questions could not be found");
//         }
    
//         Quiz quiz = new Quiz();
//         quiz.setQuizName(quizDTO.getQuizName());
//         quiz.setTotalQuestions(quizDTO.getTotalQuestions());
//         quiz.setQuizTime(quizDTO.getQuizTime());
//         quiz.setTotalMarks(quizDTO.getTotalMarks());
//         quiz.setEqualWeightage(quizDTO.isEqualWeightage());
//         quiz.setQuestions(selectedQuestions); // Set questions properly
    
//         // return quizRepository.save(quiz);

//         // Log quiz before saving
//         System.out.println("Quiz Before Saving: " + quiz);

//         Quiz savedQuiz = quizRepository.save(quiz);

//         // Log after saving
//         System.out.println("Saved Quiz: " + savedQuiz);

//         return savedQuiz;
//     }
    
//     public List<Quiz> getAllQuizzes() {
//         return quizRepository.findAll();
//     }

//     public Map<String, String> activateQuiz(Long id) {
//         Optional<Quiz> quizOptional = quizRepository.findById(id);
//         if (quizOptional.isPresent()) {
//             Quiz quiz = quizOptional.get();
//             if (quiz.isActive()) {
//                 return Map.of("message", "Quiz is already active.");
//             }
//             quiz.setActive(true);
//             quiz.setQuizCode(generateQuizCode());
//             quizRepository.save(quiz);
//             return Map.of("message", "Quiz activated successfully!", "quizCode", quiz.getQuizCode());
//         }
//         return Map.of("message", "Quiz not found.");
//     }

//     public Map<String, String> deactivateQuiz(Long id) {
//         Optional<Quiz> quizOptional = quizRepository.findById(id);
//         if (quizOptional.isPresent()) {
//             Quiz quiz = quizOptional.get();
//             if (!quiz.isActive()) {
//                 return Map.of("message", "Quiz is already inactive.");
//             }
//             quiz.setActive(false);
//             quiz.setQuizCode(null);
//             quizRepository.save(quiz);
//             return Map.of("message", "Quiz deactivated successfully.");
//         }
//         return Map.of("message", "Quiz not found.");
//     }

//     private String generateQuizCode() {
//         return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
//     }

//     public QuizDTO getQuizById(Long quizId) {
//         Quiz quiz = quizRepository.findQuizWithQuestions(quizId);
//         if (quiz == null) {
//             throw new RuntimeException("Quiz not found");
//         }

//         QuizDTO quizDTO = new QuizDTO();
//         quizDTO.setQuizName(quiz.getQuizName());
//         quizDTO.setTotalQuestions(quiz.getTotalQuestions());
//         quizDTO.setQuizTime(quiz.getQuizTime());
//         quizDTO.setTotalMarks(quiz.getTotalMarks());
//         quizDTO.setEqualWeightage(quiz.isEqualWeightage());

//         if (quiz.getQuestions() != null && !quiz.getQuestions().isEmpty()) {
//             List<QuestionDTO> questionDTOs = quiz.getQuestions().stream()
//                     .map(question -> {
//                         QuestionDTO questionDTO = new QuestionDTO();
//                         questionDTO.setId(question.getId());
//                         questionDTO.setText(question.getText());
//                         questionDTO.setType(question.getType());

//                         if (question.getOptions() != null) {
//                             List<String> optionsText = question.getOptions().stream()
//                                 .map(option -> option.getOptionText())
//                                 .collect(Collectors.toList());
//                             questionDTO.setOptions(optionsText);
//                         }
    
//                         if (question.getCorrectAnswers() != null) {
//                             List<Integer> correctAnswersIndex = question.getCorrectAnswers().stream()
//                                 .map(correctAnswer -> correctAnswer.getAnswerIndex())
//                                 .collect(Collectors.toList());
//                             questionDTO.setCorrectAnswers(correctAnswersIndex);
//                         }

//                         return questionDTO;
//                     })
//                     .collect(Collectors.toList());
//             quizDTO.setQuestions(questionDTOs);
//         }

//         return quizDTO;
//     }

//     public List<ActiveQuizDTO> getActiveQuizSummaries() {
//         List<Quiz> activeQuizzes = quizRepository.findByActiveTrue();
    
//         return activeQuizzes.stream()
//             .map(quiz -> new ActiveQuizDTO(
//                 quiz.getId(),
//                 quiz.getQuizName(),
//                 quiz.getTotalQuestions() 
//             ))
//             .collect(Collectors.toList());
//     }

//     public boolean validateQuizCode(Long quizId, String quizCode) {
//         Optional<Quiz> quizOpt = quizRepository.findById(quizId);
    
//         if (quizOpt.isPresent()) {
//             Quiz quiz = quizOpt.get();
//             return quiz.isActive() && quiz.getQuizCode() != null && quiz.getQuizCode().equalsIgnoreCase(quizCode);
//         }
    
//         return false;
//     }
    
//     public List<StudentQuestionDTO> getQuestionsForStudent(String quizCode) {
//         Quiz quiz = quizRepository.findByQuizCode(quizCode)
//                 .orElseThrow(() -> new RuntimeException("Quiz not found with code: " + quizCode));
    
//         List<Question> questions = quiz.getQuestions(); // assuming Quiz has getQuestions()
    
//         return questions.stream().map(question -> {
//             StudentQuestionDTO dto = new StudentQuestionDTO();
//             dto.setId(question.getId());
//             dto.setQuestionText(question.getText());
    
//             List<String> optionTexts = question.getOptions().stream()
//                     .map(Option::getOptionText) // <- fixed this line
//                     .collect(Collectors.toList());
    
//             dto.setOptions(optionTexts);
//             return dto;
//         }).collect(Collectors.toList());
//     }

//     @Transactional
//     public void deleteQuiz(Long quizId) {
//         // Optional<Quiz> quiz = quizRepository.findById(quizId);
//         // if (quiz.isPresent()) {
//         //     quizRepository.deleteById(quizId);
//         // } else {
//         //     throw new RuntimeException("Quiz not found with id: " + quizId);
//         // }

//         Quiz quiz = quizRepository.findById(quizId)
//         .orElseThrow(() -> new RuntimeException("Quiz not found"));

//         // Manually clear the relationship between the Quiz and Questions (remove from quiz_questions table)
//         // This ensures that Questions are not deleted, just unlinked from the Quiz
//         quiz.getQuestions().clear();  // Clears the list of associated Questions

//         // Manually delete student results (cascading should also work if enabled properly)
//         studentQuizResultRepository.deleteByQuiz(quiz);

//         // Now delete the quiz
//         quizRepository.delete(quiz);
//     }


// }
package com.TestWave.testWave.Service;

import com.TestWave.testWave.Model.Quiz;
import com.TestWave.testWave.Repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public List<Quiz> getQuizzesByTeacherEmail(String email) {
        return quizRepository.findByCreatedBy(email);  // Correct: pass email directly
    }

    public void deleteQuizByCode(String quizCode) {
        quizRepository.findByQuizCode(quizCode).ifPresent(quizRepository::delete);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
    
}
