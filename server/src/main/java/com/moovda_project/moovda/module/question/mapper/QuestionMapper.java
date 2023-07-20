package com.moovda_project.moovda.module.question.mapper;

import com.moovda_project.moovda.global.dto.PageDto;
import com.moovda_project.moovda.module.answer.dto.AnswerDto;
import com.moovda_project.moovda.module.answer.entity.Answer;
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

    default List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions) {
        return questions.stream()
                .map(question -> QuestionDto.Response.builder()
                        .questionId(question.getQuestionId())
                        .title(question.getTitle())
        //                .nickname(question.getMember().getNickname())
                        .createdAt(question.getCreatedAt())
                        .answerCount(question.getAnswerCount())
                        .views(question.getViews())
                        .build())
                .collect(Collectors.toList());
    }
    default QuestionDto.Response questionToQuestionResponseDto(Question question, int page, int pageSize) {
/** TODO : pageInfo 출력 해야함  **/
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
            List<Answer> answers = question.getAnswers();
            int totalAnswers = answers.size();

            // 시작 인덱스 계산
            int startIndex = (page-1) * pageSize;
            // 끝 인덱스 계산
            int endIndex = Math.min(startIndex + pageSize, totalAnswers);
            List<Answer> paginatedAnswers = answers.subList(startIndex, endIndex);

            PageDto pageInfo = PageDto.builder()
                    .currentPage(page)
                    .total(totalAnswers)
                    .pageSize(pageSize)
                    .build();

            List<AnswerDto.Response> answerResponseDtos =
                    paginatedAnswers
                            .stream()
                            .map(answer -> AnswerDto.Response.builder()
                                    .answerId(answer.getAnswerId())
                                    .questionId(answer.getQuestion().getQuestionId())
                                    //.nickname(answer.getMember().getNickname))
                                    .memberId(answer.getMember().getMemberId())
                                    .content(answer.getContent())
                                    .createdAt(answer.getCreatedAt())
                                    .build())
                                    .collect(Collectors.toList());
            questionResponseDto.setAnswers(answerResponseDtos);

        }
/*
        List<MovieQuestionResponseDto> movieQuestionResponseDto =
                question.getAnswers()
                        .stream()
                        .map(movie -> MovieQuestionResponseDto.builder()
                                .title(movie.getMovie().getTitle())
                                .poster(movie.getMovie().getPoster())
                                .build())
                                .collect(Collectors.toList());
        questionResponseDto.setMovies(movieQuestionResponseDto);
*/
        return questionResponseDto;
    }


}
