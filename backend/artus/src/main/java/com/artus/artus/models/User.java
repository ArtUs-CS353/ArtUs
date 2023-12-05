package com.artus.artus.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class User {
    private int user_id;
    private String user_name;
    private String user_surname;
    private int user_role;
    private String email;
    private String password;
    private String contact_info;
}
