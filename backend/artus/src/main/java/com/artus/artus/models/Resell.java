package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Resell {
    private int artwork_id;
    private int customer_id;
    private int collector_id;
    private float price;

}
