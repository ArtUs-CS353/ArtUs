package com.artus.artus.services;

import com.artus.artus.mappers.NotificationMapper;
import com.artus.artus.models.Notification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final JdbcTemplate jdbcTemplate;

    public NotificationService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Notification> getNotificationsByUserID(int userID){
        String sql = "Select * from Notification where user_id = ?";
        return jdbcTemplate.query(sql,new NotificationMapper(), userID );
    }

    public List<Notification> getNotificationByUserIDByType(int userID, String type){
        String sql = "Select * from Notification where user_id = ? AND type = ?";
        return jdbcTemplate.query(sql,new NotificationMapper(), userID, type );
    }
}
