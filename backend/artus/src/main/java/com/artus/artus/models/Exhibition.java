package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Exhibition {
    private int exhibition_id;
    private String exhibition_name;
    private LocalDateTime start_date;
    private LocalDateTime end_date;
    private String poster_URL;
}
