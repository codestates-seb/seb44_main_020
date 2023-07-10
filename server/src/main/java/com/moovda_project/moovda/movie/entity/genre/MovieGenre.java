package com.moovda_project.moovda.movie.entity.genre;

import com.moovda_project.moovda.movie.entity.Movie;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor()
@Getter
@Setter
@Table(name = "movie_genre")
public class MovieGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_genre_id")
    private Long movieGenreId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_id")
    private Genre genre;

    public void setMovie(Movie movie) {
        this.movie = movie;
        if(!this.movie.getMovieGenres().contains(this)) {
            this.movie.addMovieGenres(this);
        }
    }
}
