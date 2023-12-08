package com.artus.artus.mappers;

import com.artus.artus.models.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class EventMapper implements RowMapper<Event> {
    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        int event_id = rs.getInt("event_id");
        String link = rs.getString("link");
        LocalDateTime start_date = rs.getObject("start_date", LocalDateTime.class);
        LocalDateTime end_date = rs.getObject("end_date", LocalDateTime.class);
        String poster_URL = rs.getString("poster_URL");
        String meeting_link = rs.getString("meeting_link");

        Event event = new Event();
        event.setUser_id(user_id);
        event.setEvent_id(event_id);
        event.setLink(link);
        event.setStart_date(start_date);
        event.setEnd_date(end_date);
        event.setPoster_URL(poster_URL);
        event.setMeeting_link(meeting_link);

        return event;
    }
}
