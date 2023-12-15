package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArtistRequest{
    private int request_id;
    private String user_name;
    private String user_surname;
    private String profile_details;
    private String biography;
}
