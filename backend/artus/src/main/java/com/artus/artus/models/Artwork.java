package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

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
    private Date date;
    private Boolean is_featuring;
    private float price;
    private String status;
    private String availability;
}
