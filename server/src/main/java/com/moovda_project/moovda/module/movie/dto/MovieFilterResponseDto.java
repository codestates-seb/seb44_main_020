package com.moovda_project.moovda.module.movie.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class MovieFilterResponseDto {
    long movieId;
    String title;
    String poster;

}