package com.moovda_project.moovda.module.question.service;

import com.moovda_project.moovda.global.exception.BusinessLogicException;
import com.moovda_project.moovda.global.exception.ExceptionCode;
import com.moovda_project.moovda.module.member.entity.Member;
import com.moovda_project.moovda.module.member.service.MemberService;
import com.moovda_project.moovda.module.question.entity.Question;
import com.moovda_project.moovda.module.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class QuestionService {
    private final QuestionRepository questionRepository;

    private final MemberService memberService;

    /** 질문 등록 **/
    /** ? : 멤버id를 받아서**/
    // TODO : 작성한 회원이 존재하는 회원인지 확인

    public Question createQuestion(Question question) {
        memberService.findVerifiedMember(question.getMember().getMemberId());
        return questionRepository.save(question);
    }

    /** 질문 수정 **/
    public Question updateQuestion(Question question, long authenticationMemberId) {
        Question findQuestionId = findVerifiedQuestion(question.getQuestionId());


        checkValidatedMember(authenticationMemberId,findQuestionId);

        findQuestionId.setTitle(question.getTitle());
        findQuestionId.setContent(question.getContent());

        return questionRepository.save(findQuestionId);
    }

    /** 질문 조회
     * Transactional로 인해 save를 안해도 views 증가**/
    public Question findQuestion(long questionId){

        Question findQuestion = findVerifiedQuestion(questionId);

        // 조회수 +1 증가
        findQuestion.addView(findQuestion.getViews());

        return findQuestion;
    }

    /** 전체 질문 조회 **/
    public Page<Question> findQuestions(int page) {
        // 페이지 당 데이터 수 10개
        return questionRepository.findAll(PageRequest.of(page,10));
    }

    /** 질문 삭제 **/
    public void deleteQuestion(long questionId,long authenticationMemberId) {

        // 로그인 회원의 id를 얻어서 question을 등록한 회원의 id와 비교
        Question findQuestionId = findVerifiedQuestion(questionId);

        checkValidatedMember(authenticationMemberId,findQuestionId);

        questionRepository.delete(findQuestionId);

    }
    /** 질문이 등록된 질문인지 확인 메서드 **/
    public Question findVerifiedQuestion(long questionId){

        Optional<Question> findQuestion = questionRepository.findById(questionId);

        Question question = findQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }

    /** 작성한 회원인지 확인하는 메서드 **/
    private void checkValidatedMember(long memberId, Question question) {
        if(question.getMember().getMemberId()!= memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }
}
