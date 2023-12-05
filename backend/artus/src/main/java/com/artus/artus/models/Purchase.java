package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Purchase {
    private int user_id;
    private int artwork_id;
    private int purchase_id;
    private LocalDateTime purchase_date;
    private float price;
    private String receipt;
}
