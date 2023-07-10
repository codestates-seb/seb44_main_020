package com.moovda_project.moovda.movie.api;

import com.moovda_project.moovda.movie.entity.Movie;
import com.moovda_project.moovda.movie.entity.genre.Genre;
import com.moovda_project.moovda.movie.repository.genre.GenreRepository;
import com.moovda_project.moovda.movie.entity.genre.MovieGenre;
import com.moovda_project.moovda.movie.entity.staff.MovieStaff;
import com.moovda_project.moovda.movie.entity.staff.Staff;
import com.moovda_project.moovda.movie.repository.staff.StaffRepository;
import com.moovda_project.moovda.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ApiService {

    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final StaffRepository staffRepository;

    public void init(String jsonData) {
        try {
            JSONParser jsonParser = new JSONParser();

            JSONObject jsonObj = (JSONObject) jsonParser.parse(jsonData);

            JSONArray data = (JSONArray) jsonObj.get("Data");
            JSONObject result = (JSONObject) data.get(0);
            JSONArray resultArray = (JSONArray) result.get("Result");

            for (Object item : resultArray) {
                JSONObject movieObj = (JSONObject) item;

                Movie movie = new Movie();
                movie.setTitle(movieObj.get("title").toString());
                movie.setCountry(movieObj.get("nation").toString());

                JSONObject plotsObj = (JSONObject) movieObj.get("plots");
                JSONArray plotArray = (JSONArray) plotsObj.get("plot");
                JSONObject plotObj = (JSONObject) plotArray.get(0);
                String plotText = plotObj.get("plotText").toString();
                movie.setSummary(plotText);


                String posterUrl = movieObj.get("posters").toString().split("\\|")[0];
                movie.setPoster(posterUrl);

                movie.setRating(movieObj.get("rating").toString());
                movie.setOpeningDate(movieObj.get("repRlsDate").toString());

                movie.setRunningTime(Integer.parseInt(movieObj.get("runtime").toString()));

                String[] genres = movieObj.get("genre").toString().split(",");
                for(String genre : genres) {
                   MovieGenre movieGenre = new MovieGenre();

                   Genre existingGenre = genreRepository.findByName(genre);
                   if (existingGenre == null) {
                       existingGenre = new Genre();
                       existingGenre.setName(genre);
                       genreRepository.save(existingGenre);
                   }

                   movieGenre.setGenre(existingGenre);
                   movieGenre.setMovie(movie);
               }

                JSONObject actorsObj = (JSONObject) movieObj.get("staffs");
                JSONArray actorArray = (JSONArray) actorsObj.get("staff");
                int directorCnt = 0;
                int actorCnt = 0;
                for(Object actorObj : actorArray) {
                    JSONObject ao = (JSONObject) actorObj;

                    MovieStaff movieStaff = new MovieStaff();

                    String position = ao.get("staffRoleGroup").toString();
                    if(!position.equals("감독") && !position.equals("출연")) {
                        continue;
                    }
                    if(position.equals("감독")) directorCnt++;
                    if(position.equals("출연")) actorCnt++;

                    movieStaff.setPosition(position);
                    movieStaff.setRole(ao.get("staffRole").toString());

                    String staffName = ao.get("staffNm").toString();
                    Staff existingStaff = staffRepository.findByName(staffName);
                    if(existingStaff==null) {
                        existingStaff = new Staff();
                        existingStaff.setName(staffName);
                        staffRepository.save(existingStaff);
                    }
                    movieStaff.setStaff(existingStaff);
                    movieStaff.setMovie(movie);

                    if(directorCnt+actorCnt==8) break;
                }

                movieRepository.save(movie);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}