package com.moovda_project.moovda.movie.repository.watch;

import com.moovda_project.moovda.movie.entity.watch.ToWatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToWatchRepository extends JpaRepository<ToWatch, Long> {
}
