package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Auction {
    private int auction_id;
    private int artwork_id;
    private LocalDateTime start_date;
    private LocalDateTime end_date;
    private String type;
    private float starting_amount;
    private String status;
}
