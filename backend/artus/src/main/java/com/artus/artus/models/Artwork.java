package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class Artwork {
    private int artwork_id;
    private int artist_id;
    private String title;
    private String description;
    private String type;
    private String material;
    private String size;
    private String rarity;
    private String imageURL;
    private String movement;
    private LocalDate date;
    private Boolean is_featuring;
    private float price;
    private String status;
    private String availability;
    private int favorite_count;
}
