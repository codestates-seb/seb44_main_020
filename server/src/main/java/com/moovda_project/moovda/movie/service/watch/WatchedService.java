package com.moovda_project.moovda.movie.service.watch;

import com.moovda_project.moovda.exception.BusinessLogicException;
import com.moovda_project.moovda.exception.ExceptionCode;
import com.moovda_project.moovda.movie.entity.watch.Watched;
import com.moovda_project.moovda.movie.repository.watch.WatchedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WatchedService {

    private final WatchedRepository watchedRepository;

    public Watched createWatched(Watched watched) {
      return watchedRepository.save(watched);
    }

    public void deleteWatched(long watchedId) {
         Watched watched = findVerifiedWatched(watchedId);

         watchedRepository.delete(watched);
    }

    private Watched findVerifiedWatched(long watchedId) {
        Optional<Watched> watched = watchedRepository.findById(watchedId);

        Watched findWatched = watched.orElseThrow(() -> new BusinessLogicException(ExceptionCode.WATCHED_NOT_FOUND));

        return findWatched;
    }

}
