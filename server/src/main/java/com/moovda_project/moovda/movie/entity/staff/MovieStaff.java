package com.moovda_project.moovda.movie.entity.staff;

import com.moovda_project.moovda.movie.entity.Movie;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor()
@Getter
@Setter
@Table(name = "movie_staffs")
public class MovieStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_staff_id")
    private Long movieStaffId;
    @Column(name = "role")
    private String role;

    @Column(name = "position")
    private String position;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    public void setMovie(Movie movie) {
        this.movie = movie;
        if(!this.movie.getMovieStaffs().contains(this)) {
            this.movie.addMovieStaffs(this);
        }
    }
}
