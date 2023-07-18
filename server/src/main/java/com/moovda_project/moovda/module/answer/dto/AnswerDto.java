package com.moovda_project.moovda.module.answer.dto;

import com.moovda_project.moovda.module.movie.entity.Movie;
import lombok.*;

import java.time.LocalDateTime;

@Getter
public class AnswerDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private long memberId;

        private long questionId;

        private String content;

        private Movie movie;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long answerId;

        private long authenticatedMemberId;

        private long questionId;

        private String content;

        private Movie movie;

        public void addAnswerId(long answerId) {
            this.answerId = answerId;
        }

        public void addAuthenticatedMemberId(long authenticatedMemberId) {
            this.authenticatedMemberId = authenticatedMemberId;
        }
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long answerId;

        private long questionId;

        private String nickname;

        private String content;

        private Movie movie;

        private long memberId;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}
