package com.artus.artus.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Enthusiast extends User{
    private int user_id;
    private String address;
    private float balance;

}
