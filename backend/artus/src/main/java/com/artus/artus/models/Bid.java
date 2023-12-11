package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Bid {
    private int user_id;
    private int auction_id;
    private int bid_id;
    private double amount;
    private LocalDateTime time_stamp;
    private String status;
}
