package com.moovda_project.moovda.movie.repository.watch;

import com.moovda_project.moovda.movie.entity.watch.Watched;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchedRepository extends JpaRepository<Watched,Long> {
}
