package com.artus.artus.models;


import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class AuctionProperties {
    private int auction_id;
    private int artwork_id;
    private int artist_id;
    private LocalDateTime start_date;
    private LocalDateTime end_date;
    private String auction_type;
    private float starting_amount;
    private String auction_status;
    private String title;
    private String artwork_type;
    private String material;
    private String imageURL;
}
