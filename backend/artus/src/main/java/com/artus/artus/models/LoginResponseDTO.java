package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class LoginResponseDTO {
    private int userId;
    private int role;
    private String message;
}
