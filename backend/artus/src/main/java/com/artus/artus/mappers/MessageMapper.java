package com.artus.artus.mappers;

import com.artus.artus.models.Message;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class MessageMapper implements RowMapper<Message> {
    @Override
    public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
        int enthusiast_id = rs.getInt("enthusiast_id");
        int artist_id = rs.getInt("artist_id");
        String context = rs.getString("context");
        LocalDateTime send_time = rs.getObject("send_time", LocalDateTime.class);

        Message message = new Message();
        message.setArtist_id(artist_id);
        message.setEnthusiast_id(enthusiast_id);
        message.setContext(context);
        message.setSend_time(send_time);

        return message;
    }
}
