package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Artist extends User{
    private int user_id;
    private String profile_details;
    private int follower_count;
    private Boolean is_featuring;
    private String biography;
    private float balance;

}
