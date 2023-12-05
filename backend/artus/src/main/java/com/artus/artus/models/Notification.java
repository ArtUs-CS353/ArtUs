package com.artus.artus.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Notification {
    private int user_id;
    private int notification_id;
    private String type;
    private String content;
}
