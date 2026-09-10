package com.cop.movies.day.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cop.movies.day.model.entity.MovieDate;

public interface MovieDateRepository extends JpaRepository<MovieDate, Long> {
    @Query("""
                SELECT m
                FROM MovieDate m
                WHERE MONTH(m.date) = :month
                  AND DAY(m.date) = :day
            """)
    List<MovieDate> findByMonthAndDay(
            @Param("month") int month,
            @Param("day") int day);
}
