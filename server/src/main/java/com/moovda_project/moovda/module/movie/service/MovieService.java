package com.moovda_project.moovda.module.movie.service;


import com.moovda_project.moovda.global.exception.BusinessLogicException;
import com.moovda_project.moovda.global.exception.ExceptionCode;
import com.moovda_project.moovda.module.movie.dto.MovieSearchCondition;
import com.moovda_project.moovda.module.movie.dto.MovieSearchDto;
import com.moovda_project.moovda.module.movie.entity.Movie;
import com.moovda_project.moovda.module.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@Transactional
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    @Transactional(readOnly = true)
    public Movie findMovie(long movieId) {
        return findVerifiedMovie(movieId);
    }

    public Movie updateMovie(Movie movie) {
        Movie findMovie = findVerifiedMovie(movie.getMovieId());

        Optional.ofNullable(movie.getStarAvg())
                .ifPresent(starAvg -> findMovie.setStarAvg(starAvg));

        return movieRepository.save(findMovie);
    }

    public List<Movie> filterMovie(MovieSearchCondition condition) {
        List<MovieSearchDto> movieSearchDtos = movieRepository.search(condition);

        Set<Long> movieIds = new HashSet<>();
        List<Movie> filteredMovies = new ArrayList<>();

        removeSameMovie(movieSearchDtos, movieIds, filteredMovies); // 중복 영화 제거

        return filteredMovies;
    }

    public List<Movie> mainMovie(int count) {
        List<Movie> allMovies = movieRepository.findAll();
        List<Movie> randomMovies = new ArrayList<>();

        int totalMovies = allMovies.size();

        if(count>=totalMovies) {
            return allMovies;
        }

        Random random = new Random();
        while (randomMovies.size()<count) {
            int randomIndex = random.nextInt(totalMovies);
            Movie randomMovie = allMovies.get(randomIndex);

            if (!randomMovies.contains(randomMovie)) randomMovies.add(randomMovie);
        }

        return randomMovies;
    }

    private void removeSameMovie(List<MovieSearchDto> movieSearchDtos, Set<Long> movieIds, List<Movie> filteredMovies) {
        for (MovieSearchDto movieSearchDto : movieSearchDtos) {
            if (!movieIds.contains(movieSearchDto.getMovieId())) {
                movieIds.add(movieSearchDto.getMovieId());
                Movie movie = findVerifiedMovie(movieSearchDto.getMovieId());
                filteredMovies.add(movie);
            }
        }
    }

    public Movie findVerifiedMovie(long movieId) {
        Optional<Movie> optionalMovie = movieRepository.findById(movieId);
        Movie movie = optionalMovie.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND));

        return movie;
    }

}
