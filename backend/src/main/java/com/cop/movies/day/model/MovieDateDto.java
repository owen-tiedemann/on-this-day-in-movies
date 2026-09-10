package com.cop.movies.day.model;

import java.time.LocalDate;

import lombok.Builder;

@Builder 
public record MovieDateDto(String movie, LocalDate date, String description) {
    
}
