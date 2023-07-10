package com.moovda_project.moovda.answer.service;

import com.moovda_project.moovda.answer.entity.Answer;
import com.moovda_project.moovda.answer.repository.AnswerRepository;
import com.moovda_project.moovda.exception.BusinessLogicException;
import com.moovda_project.moovda.exception.ExceptionCode;
import com.moovda_project.moovda.question.entity.Question;
import com.moovda_project.moovda.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;

    public Answer createAnswer(Answer answer) {
        Question findQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());
        answer.addQuestion(findQuestion);
        // TODO : 영화를 넣는 메서드 새로 추가
        // answer.addMember(answer.getMember()); TODO : MemberIdExtractor에서 memberId 받아서 하는 것으로 수정
        // answer.addMovie(answer.getMovie());
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        // TODO : 본인 검증 로직 추가
        Answer foundAnswer = findAnswer(answer.getAnswerId());
        Optional.ofNullable(answer.getContent()).ifPresent(content -> foundAnswer.setContent(content));
        Optional.ofNullable(answer.getMovie()).ifPresent(movie -> foundAnswer.setMovie(movie));
        Optional.ofNullable(answer.getModifiedAt()).ifPresent(modifiedAt -> foundAnswer.setModifiedAt(modifiedAt));
        return answerRepository.save(foundAnswer);
    }


    public void deleteAnswer(long answerId) {
        // TODO : 본인 검증 로직 추가
        answerRepository.deleteById(answerId);
    }
    public Answer findAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        return optionalAnswer.orElseThrow( () -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }


    public List<Answer> findAnswers(long questionId) {
        return answerRepository.findAll(questionId);
    }
    // TODO : 페이징 기능 추가
}
