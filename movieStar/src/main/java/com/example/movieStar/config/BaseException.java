package com.example.movieStar.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BaseException  extends Exception{
    private BaseExceptionStatus status;
}