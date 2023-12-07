package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Message {
    private int enthusiast_id;
    private int artist_id;
    private String context;
    private LocalDateTime send_time;
}
