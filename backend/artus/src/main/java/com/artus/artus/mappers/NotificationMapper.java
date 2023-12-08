package com.artus.artus.mappers;

import com.artus.artus.models.Notification;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class NotificationMapper implements RowMapper<Notification> {
    @Override
    public Notification mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        int notification_id = rs.getInt("notification_id");
        String type = rs.getString("type");
        String content = rs.getString("content");

        Notification notification = new Notification();
        notification.setUser_id(user_id);
        notification.setNotification_id(notification_id);
        notification.setType(type);
        notification.setContent(content);

        return notification;
    }
}
