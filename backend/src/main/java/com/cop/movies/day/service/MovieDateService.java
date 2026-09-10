package com.cop.movies.day.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cop.movies.day.model.MovieDateDto;
import com.cop.movies.day.model.entity.MovieDate;
import com.cop.movies.day.repository.MovieDateRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieDateService {

    private final MovieDateRepository movieRepository;

    public List<MovieDateDto> getMovies() {
        List<MovieDate> movieDates = movieRepository.findAll();

        return movieDates.stream().map(movie -> {
            return MovieDateDto.builder().date(movie.getDate()).description(movie.getDescription())
                    .movie(movie.getMovie()).build();
        }).toList();
    }

    public List<MovieDateDto> getMovieByDate(Integer month, Integer day) {
        log.info("Getting movies by date [month={}, day={}]", month, day);
        List<MovieDate> movieDates = movieRepository.findByMonthAndDay(month, day);

        return movieDates.stream().map(movie -> {
            return MovieDateDto.builder().date(movie.getDate()).description(movie.getDescription())
                    .movie(movie.getMovie()).build();
        }).toList();
    }

    public void addMovieDate(MovieDateDto movieDateDto) {

        log.info("Creating movie date with details [dto={}]", movieDateDto);

        MovieDate movieDate = MovieDate.builder()
                .date(movieDateDto.date())
                .description(movieDateDto.description())
                .movie(movieDateDto.movie()).build();

        movieRepository.save(movieDate);
    }
}
