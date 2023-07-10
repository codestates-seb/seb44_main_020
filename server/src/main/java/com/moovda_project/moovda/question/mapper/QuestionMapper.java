package com.moovda_project.moovda.question.mapper;

import com.moovda_project.moovda.question.dto.QuestionDto;
import com.moovda_project.moovda.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    Question QuestionPostDtoToQuestion(QuestionDto.Post post);

    Question QuestionPatchDtoToQuestion(QuestionDto.Patch patch);

    List<QuestionDto.Response> QuestionsToQuestionResponseDtos(List<Question> questions);

    default QuestionDto.Response QuestionToQuestionResponseDto(Question question) {

        QuestionDto.Response questionResponseDto =
                QuestionDto.Response.builder()
                        .questionId(question.getQuestionId())
//                        .nickname(question.getMember().getNickname())
                        .memberId(question.getMember().getMemberId())
                        .title(question.getTitle())
                        .content(question.getContent())
                        .createdAt(question.getCreatedAt())
                        .modifiedAt(question.getModifiedAt())
                        .answerCount(question.getAnswerCount())
                        .build();
        return questionResponseDto;
    }
}
