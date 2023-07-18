package com.moovda_project.moovda.module.question.dto;


import com.moovda_project.moovda.module.answer.dto.AnswerDto;
import com.moovda_project.moovda.module.member.entity.Member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.moovda_project.moovda.module.movie.dto.MovieQuestionResponseDto;
import com.moovda_project.moovda.module.movie.dto.MovieResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


public class QuestionDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @Positive
        private long memberId;

        @Size(min = 5, max = 30, message = "제목은 5자 이상 30자 이하여야합니다.")
        @NotBlank
        private String title;

        @Size(min = 10, message = "내용은 10글자 이상이어야 합니다.")
        @NotBlank
        private String content;

        public Member getMember() {
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }

    }

    @Getter
    @NoArgsConstructor
    public static class Patch {

        @Positive
        private long questionId;
        private long authenticatedMemberId;
        @Size(min = 5, max = 30 , message = "제목은 5자 이상 30자 이하여야 합니다.")
        @NotBlank
        private String title;
        @Size(min = 10, message = "내용은 10글자 이상이어야 합니다.")
        @NotBlank
        private String content;
        public void addQuestionId(long questionId) {
            this.questionId = questionId;
        }
        public void addAuthenticatedMemberId(long authenticatedMemberId) {
            this.authenticatedMemberId = authenticatedMemberId;
        }
        public Patch(String title, String content) {
            this.title = title;
            this.content = content;
        }
    }

    @Getter @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        @Positive
        private long questionId;
        private String nickname;
        @Positive
        private long memberId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private int answerCount;
        private int views;
        private List<AnswerDto.Response> answers;
        private List<MovieQuestionResponseDto> movies;
    }

    @Getter @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ListResponse {
        private long questionId;
        private String title;
        private String nickname;
        private LocalDateTime createdAt;
        private int answerCount;
        private int views;
    }

}
