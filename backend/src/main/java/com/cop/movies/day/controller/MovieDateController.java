package com.cop.movies.day.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cop.movies.day.model.MovieDateDto;
import com.cop.movies.day.service.MovieDateService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController 
@RequiredArgsConstructor 
@CrossOrigin(origins = "*") 
public class MovieDateController {
    
    private final MovieDateService movieDateService;


    @GetMapping("/movie-dates")
    public List<MovieDateDto> getMovieDates() {
        return movieDateService.getMovies();
    }

    @GetMapping("/movie-date")
    public List<MovieDateDto> getMoviesForDate(@RequestParam Integer month, Integer day) {
        return movieDateService.getMovieByDate(month, day);
    }
    
    
    @PostMapping("/movie-date")
    public void addMovieDate(@RequestBody MovieDateDto movieDateDto) {        
        movieDateService.addMovieDate(movieDateDto);
    }
    

}
