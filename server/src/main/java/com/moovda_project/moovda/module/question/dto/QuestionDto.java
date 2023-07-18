package com.moovda_project.moovda.module.question.dto;


import com.moovda_project.moovda.module.member.entity.Member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;


public class QuestionDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @Positive
        private long memberId;

        @Size(min = 5, max = 30)
        @NotBlank
        private String title;

        @Size(min = 10)
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

        private String title;

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

        private LocalDateTime modifiedAt;

        private int answerCount;

        private int views;


//        private List<AnswerDto.Response> answers;
    }
}
