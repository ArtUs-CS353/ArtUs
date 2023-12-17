package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Event {
    private int artist_id;
    private int event_id;
    private LocalDateTime start_date;
    private LocalDateTime end_date;
    private String poster_URL;
    private String meeting_link;
    private String status;
}
