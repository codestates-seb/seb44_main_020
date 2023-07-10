package com.moovda_project.moovda.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

        private String movie;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long answerId;

        private long questionId;

        private String content;

        private String movie;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long answerId;

        private long questionId;

        private String nickname;

        private String content;

        private String movie;

        private long memberId;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}
