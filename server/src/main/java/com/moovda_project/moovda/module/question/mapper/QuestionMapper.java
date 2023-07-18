package com.moovda_project.moovda.module.question.mapper;

import com.moovda_project.moovda.module.answer.dto.AnswerDto;
import com.moovda_project.moovda.module.movie.dto.MovieQuestionResponseDto;
import com.moovda_project.moovda.module.question.dto.QuestionDto;
import com.moovda_project.moovda.module.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface QuestionMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);
    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);
    List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions);
    default QuestionDto.Response questionToQuestionResponseDto(Question question) {

        QuestionDto.Response questionResponseDto =
                QuestionDto.Response.builder()
                        .questionId(question.getQuestionId())
        //                .nickname(question.getMember().getNickname())
                        .memberId(question.getMember().getMemberId())
                        .title(question.getTitle())
                        .content(question.getContent())
                        .createdAt(question.getCreatedAt())
                        .answerCount(question.getAnswerCount())
                        .views(question.getViews())
                        .build();

        if(question.getAnswers() != null) {
            List<AnswerDto.Response> answerResponseDtos =
                    question.getAnswers()
                            .stream()
                            .map(answer -> AnswerDto.Response.builder()
                                    .answerId(answer.getAnswerId())
                                    .questionId(answer.getQuestion().getQuestionId())
                                    //.nickname(answer.getMember().getNickname))
                                    .content(answer.getContent())
                                    .build())
                                    .collect(Collectors.toList());
            questionResponseDto.setAnswers(answerResponseDtos);

        }

        List<MovieQuestionResponseDto> movieQuestionResponseDto =
                question.getAnswers()
                        .stream()
                        .map(movie -> MovieQuestionResponseDto.builder()
                                .title(movie.getMovie().getTitle())
                                .poster(movie.getMovie().getPoster())
                                .build())
                                .collect(Collectors.toList());
        questionResponseDto.setMovies(movieQuestionResponseDto);

        return questionResponseDto;
    }


}
