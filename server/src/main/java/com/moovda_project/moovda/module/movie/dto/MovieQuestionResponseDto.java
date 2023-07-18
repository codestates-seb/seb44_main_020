package com.moovda_project.moovda.module.movie.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MovieQuestionResponseDto {
    private String title;
    private String poster;
}
