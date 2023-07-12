package com.moovda_project.moovda.module.movie.repository;

import com.moovda_project.moovda.module.movie.dto.MovieFilterResponseDto;
import com.moovda_project.moovda.module.movie.dto.MovieSearchDto;
import com.moovda_project.moovda.module.movie.dto.QMovieSearchDto;
import com.moovda_project.moovda.module.movie.entity.Movie;
import com.moovda_project.moovda.module.movie.entity.QMovie;
import com.moovda_project.moovda.module.movie.entity.genre.QGenre;
import com.moovda_project.moovda.module.movie.mapper.MovieMapper;
import com.moovda_project.moovda.module.movie.service.MovieService;
import com.moovda_project.moovda.module.search.MovieSearchCondition;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

import static com.moovda_project.moovda.module.movie.entity.QMovie.*;
import static com.moovda_project.moovda.module.movie.entity.genre.QGenre.*;
import static com.moovda_project.moovda.module.movie.entity.genre.QMovieGenre.*;
import static org.thymeleaf.util.StringUtils.*;

public class MovieRepositoryImpl implements MovieRepositoryCustom {

    private final JPAQueryFactory queryFactory;



    public MovieRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<MovieSearchDto> search(MovieSearchCondition condition) {
        return queryFactory
                .select(new QMovieSearchDto(
                        movie.movieId,
                        genre.name,
                        movie.country,
                        movie.rating,
                        movie.starAvg
                ))
                .from(movie)
                .leftJoin(movie.movieGenres, movieGenre)
                .leftJoin(movieGenre.genre, genre)
                .where(
                        genreNameEq(condition.getGenre()),
                        countryEq(condition.getCountry()),
                        ratingEq(condition.getRating()),
                        starAvgBetween(condition.getStartStarAvg(), condition.getEndStarAvg())

                )
                .fetch();


    }

    private BooleanExpression genreNameEq(String genre) {
        return isEmpty(genre) ? null : QGenre.genre.name.eq(genre);
    }

    private BooleanExpression countryEq(String country) {
        return StringUtils.isEmpty(country) ? null : QMovie.movie.country.eq(country);
    }

    private BooleanExpression ratingEq(String rating) {
        return rating == null ? null : QMovie.movie.rating.eq(rating);
    }

    private BooleanExpression starAvgBetween(Double startStarAvg, Double endStarAvg) {
        if (startStarAvg == null && endStarAvg == null) {
            return null;
        } else if (startStarAvg == null) {
            return QMovie.movie.starAvg.loe(endStarAvg);
        } else if (endStarAvg == null) {
            return QMovie.movie.starAvg.goe(startStarAvg);
        } else {
            return QMovie.movie.starAvg.between(startStarAvg, endStarAvg);
        }
    }
}